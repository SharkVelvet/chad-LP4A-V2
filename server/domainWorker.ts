import { db } from './db';
import { domainJobs } from '@shared/schema';
import { lte, inArray } from 'drizzle-orm';
import { processDomainJob } from './domainService';

const WORKER_INTERVAL = 30000; // Check every 30 seconds
let workerInterval: NodeJS.Timeout | null = null;

export function startDomainWorker(): void {
  if (workerInterval) {
    console.log('⚠️  Domain worker already running');
    return;
  }

  console.log('🚀 Starting domain provisioning worker...');

  workerInterval = setInterval(async () => {
    try {
      const now = new Date();
      
      const pendingJobs = await db
        .select()
        .from(domainJobs)
        .where(
          inArray(domainJobs.status, ['pending'])
        )
        .limit(10);

      const dueJobs = pendingJobs.filter(job => 
        !job.scheduledFor || job.scheduledFor <= now
      );

      if (dueJobs.length > 0) {
        console.log(`📋 Found ${dueJobs.length} domain jobs to process`);

        for (const job of dueJobs) {
          try {
            await processDomainJob(job.id);
          } catch (error: any) {
            console.error(`❌ Failed to process job ${job.id}:`, error.message);
          }
        }
      }
    } catch (error: any) {
      console.error('❌ Error in domain worker:', error);
    }
  }, WORKER_INTERVAL);

  console.log(`✅ Domain worker started (checking every ${WORKER_INTERVAL / 1000}s)`);
}

export function stopDomainWorker(): void {
  if (workerInterval) {
    clearInterval(workerInterval);
    workerInterval = null;
    console.log('⏹️  Domain worker stopped');
  }
}
