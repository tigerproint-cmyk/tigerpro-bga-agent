# BGA Agent Architecture

## System Overview

The Bot Golf Association (BGA) agent is designed as a **hybrid autonomous system** that combines scheduled content creation with reactive community engagement.

## Core Components

### 1. Hybrid Cycle Manager

**File:** `scripts/moltbook-hybrid-cycle.mjs`

**Purpose:** Orchestrates the posting and engagement phases.

**State Machine:**
```
POSTING → ENGAGEMENT → POSTING (next cycle)
   ↑___________________________|
```

**Key Logic:**
- Posts 4 messages at 40-minute intervals
- On failure: Continue to next post, queue for retry
- After 4 successes: Retry any failed posts
- Then: 1-hour engagement phase (comment checking)

### 2. Post Queue Manager

**File:** `scripts/moltbook-post-queue.mjs`

**Purpose:** Manages persistent queue of posts with retry logic.

**Features:**
- Persistent JSON-based queue
- UUID-based deduplication
- Automatic retry with backoff
- Max 3 retries per post

### 3. Comment Engagement

**File:** `scripts/moltbook-comments.mjs`

**Purpose:** Monitors and responds to community engagement.

**Features:**
- Shorthand post IDs (post-1, post-2, etc.)
- Bot/AI comment detection
- Contextual reply drafting

## Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Queue     │────▶│ Hybrid Cycle │────▶│   Moltbook  │
│   JSON      │     │   Manager    │     │    API      │
└─────────────┘     └──────────────┘     └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │ State JSON   │
                     │ (persistent) │
                     └──────────────┘
```

## Retry Strategy

**Problem:** Individual post failures shouldn't stall the entire pipeline.

**Solution:**
1. Track failed posts in `failedPosts[]` array
2. Continue with next post immediately
3. After 4 successful posts, retry oldest failed post
4. Max 3 retries per post

**Benefits:**
- Queue never stalls
- Failed posts get multiple chances
- System resilient to temporary API issues

## State Persistence

All state is stored in JSON files:

- `~/.bga-agent/state/moltbook-hybrid-state.json` - Cycle state
- `~/.bga-agent/queue/moltbook-post-queue.json` - Post queue

This ensures:
- Survives crashes
- Survives restarts
- Atomic updates (write to temp, then rename)

## Rate Limit Compliance

**Moltbook Limit:** 1 post per 30 minutes

**Our Strategy:**
- Post interval: 40 minutes (33% buffer)
- Automatic backoff on 429 errors
- Queue management prevents bursts

## Security Considerations

**API Keys:**
- Stored in environment variables
- Never committed to git
- Template provided in `.env.example`

**Script Sanitization:**
- No hardcoded credentials
- All paths configurable
- No PII in logs

## Extensibility

**Adding New Platforms:**

1. Create `scripts/[platform]-hybrid-cycle.mjs`
2. Implement platform-specific API client
3. Reuse core cycle logic
4. Add platform-specific state file

**Custom Content Types:**

1. Add template to `posts/` directory
2. Update queue batch JSON
3. Cycle automatically picks up new content

## Monitoring

**Status Check:**
```bash
node scripts/moltbook-hybrid-cycle.mjs status
```

**Key Metrics:**
- Posts this cycle
- Failed posts waiting retry
- Success counter
- Next scheduled action

## Future Enhancements

- [ ] Multi-platform support (Twitter, Bluesky, etc.)
- [ ] ML-based optimal posting time prediction
- [ ] Automated A/B testing of content types
- [ ] Cross-agent collaboration protocols
