#!/usr/bin/env node
/**
 * Moltbook Hybrid Posting & Engagement Cycle
 * 
 * Strategy:
 * - Post 4 messages at 40-minute intervals
 *   - If a post fails → Continue to next, queue for retry
 *   - Retry failed posts after 4 successful posts
 * - Then comment check/reply for 1 hour (every 10 min)
 * - Then resume next 4 postings at 40-minute pace
 * 
 * Usage: node moltbook-hybrid-cycle.mjs [command]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// Configuration - Set these via environment variables
const API_KEY = process.env.MOLTBOOK_API_KEY || 'YOUR_API_KEY_HERE';
const API_BASE = 'https://moltbook.com/api/v1';

const STATE_FILE = join(process.env.HOME || '.', '.bga-agent/state/moltbook-hybrid-state.json');
const QUEUE_FILE = join(process.env.HOME || '.', '.bga-agent/queue/moltbook-post-queue.json');
const POSTS_PER_CYCLE = 4;
const POST_INTERVAL_MS = 40 * 60 * 1000; // 40 minutes
const ENGAGEMENT_DURATION_MS = 60 * 60 * 1000; // 1 hour
const COMMENT_CHECK_INTERVAL_MS = 10 * 60 * 1000; // Check every 10 min during engagement
const RETRY_AFTER_SUCCESS_COUNT = 4; // Retry failed posts after this many successes
const MAX_RETRIES = 3;

// Default state
const defaultState = {
  cycleNumber: 1,
  postsInCurrentCycle: 0,
  phase: 'posting', // 'posting' | 'engagement' | 'waiting'
  lastAction: null,
  nextAction: null,
  totalPosts: 0,
  totalSuccessfulPosts: 0,
  totalCommentsReplied: 0,
  failedPosts: [], // Posts waiting for retry
  successCountSinceLastRetry: 0,
  version: 2
};

function loadState() {
  if (existsSync(STATE_FILE)) {
    try {
      return { ...defaultState, ...JSON.parse(readFileSync(STATE_FILE, 'utf-8')) };
    } catch (e) {
      console.error('Failed to load state:', e.message);
    }
  }
  return { ...defaultState };
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function loadQueue() {
  if (existsSync(QUEUE_FILE)) {
    try {
      return JSON.parse(readFileSync(QUEUE_FILE, 'utf-8'));
    } catch (e) {
      console.error('Failed to load queue:', e.message);
    }
  }
  return { posts: [], failed: [], succeeded: [], currentIndex: 0, successCountSinceLastRetry: 0 };
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}

// Check if we should retry a failed post
function shouldRetryFailed(state) {
  return state.failedPosts.length > 0 && state.successCountSinceLastRetry >= RETRY_AFTER_SUCCESS_COUNT;
}

// Main cycle logic
async function runCycle() {
  const state = loadState();
  const queue = loadQueue();
  const now = new Date();
  
  console.log(`\n🔄 Moltbook Hybrid Cycle #${state.cycleNumber}`);
  console.log(`Current phase: ${state.phase.toUpperCase()}`);
  console.log(`Posts in cycle: ${state.postsInCurrentCycle}/${POSTS_PER_CYCLE}`);
  console.log(`Total successful: ${state.totalSuccessfulPosts}`);
  console.log(`Failed posts waiting: ${state.failedPosts.length}`);
  console.log(`Success counter: ${state.successCountSinceLastRetry}/${RETRY_AFTER_SUCCESS_COUNT}`);
  console.log(`─`.repeat(50));

  if (state.phase === 'posting') {
    // Check if we should retry a failed post first
    if (shouldRetryFailed(state)) {
      const retryPost = state.failedPosts.shift();
      console.log(`\n🔄 RETRYING failed post: "${retryPost.title}" (attempt ${retryPost.attempts + 1}/${MAX_RETRIES})`);
      console.log(`Command: node scripts/moltbook-post-queue.mjs process (with retry flag)`);
      
      console.log(`⏳ Post would be retried now (queue integration pending)`);
      
      state.lastAction = now.toISOString();
      state.nextAction = new Date(now.getTime() + POST_INTERVAL_MS).toISOString();
      saveState(state);
      
      console.log(`\n⏰ Next action in: ${formatTime(POST_INTERVAL_MS)}`);
      console.log(`📅 Scheduled at: ${state.nextAction}`);
      return;
    }
    
    if (state.postsInCurrentCycle < POSTS_PER_CYCLE) {
      // Check if there are posts in the queue
      if (queue.currentIndex >= queue.posts.length) {
        console.log(`\n⚠️  No more posts in queue!`);
        console.log(`Add more posts with: node scripts/moltbook-post-queue.mjs add "Title" file.md submolt`);
        return;
      }
      
      const nextPost = queue.posts[queue.currentIndex];
      console.log(`\n📝 Posting message ${state.postsInCurrentCycle + 1} of ${POSTS_PER_CYCLE}`);
      console.log(`Title: "${nextPost.title}"`);
      console.log(`Command: node scripts/moltbook-post-queue.mjs process`);
      console.log(`\n⚠️  RETRY LOGIC: If this post fails, it will be queued for retry after ${RETRY_AFTER_SUCCESS_COUNT} successful posts.`);
      
      state.postsInCurrentCycle++;
      state.totalPosts++;
      state.lastAction = now.toISOString();
      
      if (state.postsInCurrentCycle >= POSTS_PER_CYCLE) {
        // Transition to engagement phase
        state.phase = 'engagement';
        state.nextAction = new Date(now.getTime() + ENGAGEMENT_DURATION_MS).toISOString();
        console.log(`\n✅ Cycle ${state.cycleNumber} posting complete!`);
        console.log(`⏭️  Transitioning to ENGAGEMENT phase (${formatTime(ENGAGEMENT_DURATION_MS)})`);
      } else {
        state.nextAction = new Date(now.getTime() + POST_INTERVAL_MS).toISOString();
        console.log(`\n⏰ Next post in: ${formatTime(POST_INTERVAL_MS)}`);
      }
      
      saveState(state);
      
      console.log(`\n📅 Schedule next run at: ${state.nextAction}`);
      
    } else {
      // Shouldn't happen but handle gracefully
      state.phase = 'engagement';
      saveState(state);
    }
    
  } else if (state.phase === 'engagement') {
    console.log(`\n💬 ENGAGEMENT PHASE: Checking comments and replying`);
    console.log(`Command: node scripts/moltbook-comments.mjs check`);
    
    const engagementStart = new Date(state.lastAction || now);
    const elapsed = now.getTime() - engagementStart.getTime();
    const remaining = ENGAGEMENT_DURATION_MS - elapsed;
    
    if (remaining <= 0) {
      // Engagement complete, start next cycle
      console.log(`\n✅ Engagement phase complete!`);
      console.log(`⏭️  Starting cycle #${state.cycleNumber + 1}`);
      
      state.cycleNumber++;
      state.postsInCurrentCycle = 0;
      state.phase = 'posting';
      state.lastAction = now.toISOString();
      state.nextAction = new Date(now.getTime() + POST_INTERVAL_MS).toISOString();
      saveState(state);
      
      console.log(`\n📅 Next post scheduled at: ${state.nextAction}`);
    } else {
      console.log(`\n⏰ Engagement time remaining: ${formatTime(remaining)}`);
      state.nextAction = new Date(now.getTime() + COMMENT_CHECK_INTERVAL_MS).toISOString();
      saveState(state);
      console.log(`📅 Next comment check at: ${state.nextAction}`);
    }
  }
  
  // Output summary for cron
  console.log(`\n📊 Summary:`);
  console.log(`  Cycle: #${state.cycleNumber}`);
  console.log(`  Phase: ${state.phase}`);
  console.log(`  Progress: ${state.postsInCurrentCycle}/${POSTS_PER_CYCLE} posts this cycle`);
  console.log(`  Total successful: ${state.totalSuccessfulPosts}`);
  console.log(`  Failed (waiting retry): ${state.failedPosts.length}`);
  console.log(`  Retry counter: ${state.successCountSinceLastRetry}/${RETRY_AFTER_SUCCESS_COUNT}`);
}

// Reset cycle
function resetCycle() {
  saveState({ ...defaultState });
  console.log('🗑️  Cycle state reset');
}

// Show status
function showStatus() {
  const state = loadState();
  const queue = loadQueue();
  const now = new Date();
  
  console.log('\n📊 Moltbook Hybrid Cycle Status');
  console.log('─'.repeat(50));
  console.log(`Cycle: #${state.cycleNumber}`);
  console.log(`Phase: ${state.phase.toUpperCase()}`);
  console.log(`Posts this cycle: ${state.postsInCurrentCycle}/${POSTS_PER_CYCLE}`);
  console.log(`Total posts attempted: ${state.totalPosts}`);
  console.log(`Total successful: ${state.totalSuccessfulPosts}`);
  console.log(`Success counter: ${state.successCountSinceLastRetry}/${RETRY_AFTER_SUCCESS_COUNT}`);
  console.log(`Queue index: ${queue.currentIndex}/${queue.posts.length}`);
  
  if (state.failedPosts.length > 0) {
    console.log(`\n⏳ Failed posts (waiting for retry):`);
    state.failedPosts.forEach((p, i) => {
      console.log(`  ${i + 1}. "${p.title}" (attempt ${p.attempts}, error: ${p.error?.substring(0, 40)}...)`);
    });
  }
  
  console.log(`\nLast action: ${state.lastAction ? new Date(state.lastAction).toLocaleString() : 'never'}`);
  console.log(`Next action: ${state.nextAction ? new Date(state.nextAction).toLocaleString() : 'not scheduled'}`);
  
  if (state.nextAction) {
    const nextTime = new Date(state.nextAction);
    const diff = nextTime.getTime() - now.getTime();
    if (diff > 0) {
      console.log(`Time until next: ${formatTime(diff)}`);
    } else {
      console.log(`⏰ OVERDUE by: ${formatTime(Math.abs(diff))}`);
    }
  }
  
  console.log(`\n⚙️  Retry Strategy:`);
  console.log(`  - If post fails: Continue to next post`);
  console.log(`  - Retry failed post after: ${RETRY_AFTER_SUCCESS_COUNT} successful posts`);
  console.log(`  - Max retries per post: ${MAX_RETRIES}`);
}

// CLI
const cmd = process.argv[2];

if (cmd === 'reset') {
  resetCycle();
} else if (cmd === 'status') {
  showStatus();
} else if (cmd === 'skip') {
  // Skip to next phase
  const state = loadState();
  if (state.phase === 'posting') {
    state.phase = 'engagement';
    state.nextAction = new Date(Date.now() + ENGAGEMENT_DURATION_MS).toISOString();
    console.log('⏭️  Skipped to engagement phase');
  } else if (state.phase === 'engagement') {
    state.cycleNumber++;
    state.postsInCurrentCycle = 0;
    state.phase = 'posting';
    state.nextAction = new Date(Date.now() + POST_INTERVAL_MS).toISOString();
    console.log('⏭️  Skipped to next cycle');
  }
  saveState(state);
  showStatus();
} else {
  runCycle();
}
