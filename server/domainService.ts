import { db } from './db';
import { pages, domainJobs, domainRegistrants, type DomainJob, type DomainRegistrant } from '@shared/schema';
import { eq, and } from 'drizzle-orm';
import { getRegistrar } from './registrars';
import * as cloudflare from './cloudflareService';

export async function searchDomain(domain: string): Promise<{
  available: boolean;
  domain: string;
  price?: number;
}> {
  try {
    const registrar = getRegistrar('domainnameapi');
    return await registrar.searchDomain(domain);
  } catch (error: any) {
    console.error('Error searching domain:', error);
    throw new Error(`Failed to search domain: ${error.message}`);
  }
}

export async function initiateDomainRegistration(
  pageId: number,
  domain: string,
  registrantData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address1: string;
    address2?: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
    clientIp?: string;
  }
): Promise<{ jobId: number; message: string }> {
  try {
    const [registrant] = await db
      .insert(domainRegistrants)
      .values({
        pageId,
        ...registrantData,
      })
      .returning();

    const [job] = await db
      .insert(domainJobs)
      .values({
        pageId,
        domain,
        status: 'pending',
        step: 'register',
        metadata: { registrantId: registrant.id },
      })
      .returning();

    await db
      .update(pages)
      .set({
        domain,
        domainStatus: 'pending',
        updatedAt: new Date(),
      })
      .where(eq(pages.id, pageId));

    console.log(`✅ Domain registration initiated for ${domain} (Job ID: ${job.id})`);

    return {
      jobId: job.id,
      message: 'Domain registration initiated. Your domain will be live in 10-60 minutes.',
    };
  } catch (error: any) {
    console.error('Error initiating domain registration:', error);
    throw new Error(`Failed to initiate registration: ${error.message}`);
  }
}

export async function processDomainJob(jobId: number): Promise<void> {
  try {
    const [job] = await db.select().from(domainJobs).where(eq(domainJobs.id, jobId));

    if (!job) {
      throw new Error(`Job ${jobId} not found`);
    }

    // Guard against concurrent execution: exit early if another worker already grabbed this job
    if (job.status !== 'pending') {
      console.log(`Job ${jobId} is ${job.status}, skipping (likely processed by another worker)`);
      return;
    }

    if (job.status === 'completed') {
      console.log(`Job ${jobId} already completed`);
      return;
    }

    if (job.attempts >= job.maxAttempts) {
      await db
        .update(domainJobs)
        .set({
          status: 'failed',
          lastError: 'Max attempts reached',
          updatedAt: new Date(),
        })
        .where(eq(domainJobs.id, jobId));
      throw new Error(`Job ${jobId} failed: max attempts reached`);
    }

    // Atomically claim the job: only update if status is still 'pending'
    // This prevents race conditions with concurrent workers
    const claimed = await db
      .update(domainJobs)
      .set({
        status: 'processing',
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(domainJobs.id, jobId),
          eq(domainJobs.status, 'pending')
        )
      )
      .returning();

    if (claimed.length === 0) {
      console.log(`Job ${jobId} was claimed by another worker, skipping`);
      return;
    }

    console.log(`🔄 Processing job ${jobId} - Step: ${job.step}, Attempt: ${job.attempts + 1}`);

    switch (job.step) {
      case 'register':
        await processRegistrationStep(job);
        break;
      case 'configure_dns':
        await processDNSConfigurationStep(job);
        break;
      case 'provision_ssl':
        await processSSLProvisioningStep(job);
        break;
      default:
        throw new Error(`Unknown step: ${job.step}`);
    }
  } catch (error: any) {
    console.error(`❌ Error processing job ${jobId}:`, error);

    // Check current job status to avoid overwriting terminal states
    const [currentJob] = await db.select().from(domainJobs).where(eq(domainJobs.id, jobId));
    
    // Don't requeue if job is already in a terminal state (failed or completed)
    if (currentJob?.status === 'failed' || currentJob?.status === 'completed') {
      console.log(`Job ${jobId} is in terminal state ${currentJob.status}, not requeuing`);
      throw error;
    }

    // Increment attempts only when a step fails
    const nextAttempts = (currentJob?.attempts || 0) + 1;

    await db
      .update(domainJobs)
      .set({
        status: 'pending',
        attempts: nextAttempts,
        lastError: error.message,
        updatedAt: new Date(),
        scheduledFor: new Date(Date.now() + Math.pow(2, nextAttempts) * 60000),
      })
      .where(eq(domainJobs.id, jobId));

    throw error;
  }
}

async function processRegistrationStep(job: DomainJob): Promise<void> {
  console.log(`📝 Registering domain ${job.domain}...`);

  const [registrant] = await db
    .select()
    .from(domainRegistrants)
    .where(eq(domainRegistrants.id, job.metadata?.registrantId));

  if (!registrant) {
    throw new Error('Registrant data not found');
  }

  const [page] = await db
    .select()
    .from(pages)
    .where(eq(pages.id, job.pageId));

  let zoneId = page?.cloudflareZoneId || job.metadata?.zoneId;
  let nameservers = page?.cloudflareNameservers || job.metadata?.nameservers;

  if (!zoneId) {
    const zoneResult = await cloudflare.createZone(job.domain);
    zoneId = zoneResult.zoneId;
    nameservers = zoneResult.nameservers;
    console.log(`✅ Cloudflare zone created: ${zoneId}`);
    
    // Save zone ID immediately to job metadata for retry protection
    await db
      .update(domainJobs)
      .set({
        metadata: {
          ...job.metadata,
          zoneId,
          nameservers,
        },
        updatedAt: new Date(),
      })
      .where(eq(domainJobs.id, job.id));
  } else {
    console.log(`✅ Using existing Cloudflare zone: ${zoneId}`);
  }

  const registrar = getRegistrar('domainnameapi');
  
  let registrarOrderId = job.metadata?.registrarOrderId;
  
  if (!registrarOrderId) {
    const registrationResult = await registrar.registerDomain(job.domain, registrant);
    console.log(`✅ Domain registered with DomainNameAPI. Order ID: ${registrationResult.orderId}`);
    registrarOrderId = registrationResult.orderId;
    
    // Save order ID immediately to job metadata for retry protection
    await db
      .update(domainJobs)
      .set({
        metadata: {
          ...job.metadata,
          zoneId,
          nameservers,
          registrarOrderId,
          registrarProvider: 'domainnameapi',
        },
        updatedAt: new Date(),
      })
      .where(eq(domainJobs.id, job.id));
  } else {
    console.log(`✅ Domain already registered. Order ID: ${registrarOrderId}`);
  }

  await registrar.setNameservers(job.domain, nameservers, registrant.clientIp);

  console.log(`✅ Nameservers set to Cloudflare`);

  await db
    .update(pages)
    .set({
      cloudflareZoneId: zoneId,
      cloudflareNameservers: nameservers,
      domainStatus: 'propagating',
      updatedAt: new Date(),
    })
    .where(eq(pages.id, job.pageId));

  await db
    .update(domainJobs)
    .set({
      step: 'configure_dns',
      status: 'pending',
      metadata: {
        ...job.metadata,
        zoneId,
        nameservers,
        registrarOrderId,
        registrarProvider: 'godaddy',
      },
      updatedAt: new Date(),
      scheduledFor: new Date(Date.now() + 60000),
    })
    .where(eq(domainJobs.id, job.id));

  console.log(`✅ Registration complete. Moving to DNS configuration step.`);
}

async function processDNSConfigurationStep(job: DomainJob): Promise<void> {
  console.log(`🌐 Configuring DNS for ${job.domain}...`);

  const zoneId = job.metadata?.zoneId;
  if (!zoneId) {
    throw new Error('Zone ID not found in job metadata');
  }

  const zoneStatus = await cloudflare.checkZoneStatus(zoneId);
  
  if (zoneStatus.status !== 'active') {
    console.log(`⏳ Zone not active yet (status: ${zoneStatus.status}). Will retry later.`);
    await db
      .update(domainJobs)
      .set({
        status: 'pending',
        updatedAt: new Date(),
        scheduledFor: new Date(Date.now() + 120000),
      })
      .where(eq(domainJobs.id, job.id));
    return;
  }

  console.log(`✅ Zone is active. Creating DNS records...`);

  await cloudflare.createDNSRecords(zoneId, job.domain);
  await cloudflare.setupWWWRedirect(zoneId, job.domain);

  await db
    .update(domainJobs)
    .set({
      step: 'provision_ssl',
      status: 'pending',
      updatedAt: new Date(),
      scheduledFor: new Date(Date.now() + 60000),
    })
    .where(eq(domainJobs.id, job.id));

  console.log(`✅ DNS configured. Moving to SSL provisioning step.`);
}

async function processSSLProvisioningStep(job: DomainJob): Promise<void> {
  console.log(`🔒 Provisioning SSL for ${job.domain}...`);

  const zoneId = job.metadata?.zoneId;
  if (!zoneId) {
    throw new Error('Zone ID not found in job metadata');
  }

  await cloudflare.enableUniversalSSL(zoneId);

  const sslStatus = await cloudflare.checkSSLStatus(zoneId);

  if (sslStatus.status === 'active') {
    console.log(`✅ SSL is active for ${job.domain}`);

    await db
      .update(pages)
      .set({
        domainStatus: 'active',
        domainVerified: true,
        cloudflareSslStatus: 'active',
        updatedAt: new Date(),
      })
      .where(eq(pages.id, job.pageId));

    await db
      .update(domainJobs)
      .set({
        status: 'completed',
        step: 'complete',
        completedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(domainJobs.id, job.id));

    console.log(`🎉 Domain ${job.domain} is fully provisioned and live!`);
  } else {
    console.log(`⏳ SSL not active yet (status: ${sslStatus.status}). Will retry later.`);
    await db
      .update(domainJobs)
      .set({
        status: 'pending',
        updatedAt: new Date(),
        scheduledFor: new Date(Date.now() + 120000),
      })
      .where(eq(domainJobs.id, job.id));
  }
}

export async function getDomainJobStatus(pageId: number): Promise<{
  status: string;
  step: string;
  message: string;
}> {
  try {
    const [job] = await db
      .select()
      .from(domainJobs)
      .where(eq(domainJobs.pageId, pageId))
      .orderBy(domainJobs.createdAt)
      .limit(1);

    if (!job) {
      return {
        status: 'not_found',
        step: 'none',
        message: 'No domain registration found',
      };
    }

    const statusMessages: Record<string, string> = {
      pending: 'Waiting to be processed...',
      processing: 'Processing your domain...',
      completed: 'Your domain is live!',
      failed: 'Registration failed. Please contact support.',
    };

    const stepMessages: Record<string, string> = {
      register: 'Registering domain...',
      configure_dns: 'Configuring DNS records...',
      provision_ssl: 'Provisioning SSL certificate...',
      complete: 'All done!',
    };

    return {
      status: job.status,
      step: job.step,
      message: job.status === 'completed' 
        ? statusMessages.completed 
        : `${stepMessages[job.step] || 'Processing...'} ${job.lastError ? `(${job.lastError})` : ''}`,
    };
  } catch (error: any) {
    console.error('Error getting job status:', error);
    throw new Error(`Failed to get job status: ${error.message}`);
  }
}

export const domainService = {
  checkAvailability: searchDomain,
  getPricing: async (domains: string[]) => { 
    const results = await Promise.all(domains.map(d => searchDomain(d)));
    return results.map(r => ({ domain: r.domain, price: r.price || 0 }));
  },
  purchaseDomain: async (domain: string, years: number, contactInfo: any) => {
    throw new Error('Use initiateDomainRegistration instead');
  },
  setDnsRecords: async () => {
    console.log('DNS records are now managed automatically via Cloudflare');
    return { success: true };
  },
  setDefaultNameservers: async () => {
    console.log('Nameservers are now managed automatically via Cloudflare');
    return { success: true };
  },
  getDomainInfo: async () => { 
    throw new Error('Domain service disabled - use new domain API'); 
  },
  addMxRecord: async () => { 
    throw new Error('Domain service disabled - use new domain API'); 
  }
};
