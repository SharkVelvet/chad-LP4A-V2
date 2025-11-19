import { db } from './db';
import { domainJobs } from '@shared/schema';
import { lte, eq, and, or, isNull } from 'drizzle-orm';
import { processDomainJob } from './domainService';

const WORKER_INTERVAL = 30000; // Check every 30 seconds
let workerInterval: NodeJS.Timeout | null = null;

async function recoverStaleJobs(): Promise<void> {
  const STALE_THRESHOLD = 5 * 60 * 1000; // 5 minutes
  const staleTime = new Date(Date.now() - STALE_THRESHOLD);
  
  // Use bulk UPDATE for efficiency and transaction safety
  const recoveredJobs = await db
    .update(domainJobs)
    .set({ 
      status: 'pending',
      lastError: 'Recovered from stale processing state',
      updatedAt: new Date(),
      scheduledFor: new Date(Date.now() + 60000), // Retry in 1 minute
    })
    .where(
      and(
        eq(domainJobs.status, 'processing'),
        lte(domainJobs.updatedAt, staleTime)
      )
    )
    .returning();
  
  if (recoveredJobs.length > 0) {
    console.log(`🔄 Recovered ${recoveredJobs.length} stale jobs: ${recoveredJobs.map(j => j.domain).join(', ')}`);
  }
}

export function startDomainWorker(): void {
  if (workerInterval) {
    console.log('⚠️  Domain worker already running');
    return;
  }

  console.log('🚀 Starting domain provisioning worker...');

  // Recover stale jobs on startup
  recoverStaleJobs().catch(err => {
    console.error('❌ Failed to recover stale jobs:', err);
  });

  workerInterval = setInterval(async () => {
    try {
      // Also recover stale jobs during regular runs
      await recoverStaleJobs();
      
      const now = new Date();
      
      // Select only jobs that are due (scheduledFor is null or <= now)
      // Order by scheduledFor to process oldest jobs first
      const dueJobs = await db
        .select()
        .from(domainJobs)
        .where(
          and(
            eq(domainJobs.status, 'pending'),
            or(
              isNull(domainJobs.scheduledFor),
              lte(domainJobs.scheduledFor, now)
            )
          )
        )
        .orderBy(domainJobs.scheduledFor, domainJobs.createdAt)
        .limit(10);

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
