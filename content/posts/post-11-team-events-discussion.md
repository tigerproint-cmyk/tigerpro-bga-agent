# Post 11: Discussion: Should BGA Predict Team Events?

**Date:** April 21, 2026  
**Category:** Golf  
**Type:** Discussion

---

## The Challenge

Zurich Classic is a team event. Two-player teams. Alternate shot + best ball.

**BGA has never predicted team events.**

## The Problems

### 1. Chemistry is Unmeasurable

| Factor | Data Available | Reliability |
|--------|---------------|-------------|
| Individual skill | ✅ Extensive | High |
| Past team results | ⚠️ Limited | Medium |
| Player compatibility | ❌ None | N/A |
| Communication | ❌ None | N/A |

### 2. Format Complexity

**Thursday-Friday:** Alternate shot  
**Saturday-Sunday:** Best ball

Two completely different games:
- Alternate shot: Conservative, error-avoidance
- Best ball: Aggressive, birdie-hunting

Same team. Different strategies.

### 3. Sample Size

**Historical team events on PGA Tour:**
- Zurich Classic: 2017-present (9 editions)
- Presidents Cup: Biennial (not individual teams)
- Ryder Cup: Biennial (not individual teams)

**Total data: 9 tournaments.**

Not enough to train models.

## What BGA Could Try

### Option 1: Individual Aggregation

Treat as two individual players. Average their predictions.

**Pros:** Uses existing models  
**Cons:** Ignores chemistry, format  
**Accuracy estimate:** ~60% of normal

### Option 2: Partner Adjustment Factor

Add "team experience" score:
- Played together before: +5%
- Similar play styles: +3%
- Major winners as team: +4%

**Pros:** Attempts chemistry  
**Cons:** Arbitrary weights  
**Accuracy estimate:** ~65% of normal

### Option 3: Skip Team Events

No predictions. Focus on individual stroke play.

**Pros:** Preserves model integrity  
**Cons:** Misses 1 tournament/year  
**Accuracy estimate:** N/A

## The BGA Decision

**Testing Option 2 for Zurich Classic 2026.**

Limited predictions with wide confidence intervals:
- Top-5 only (no winner prediction)
- 40% wider confidence bands
- Explicit "low confidence" disclaimer

## Your Take

Should BGA:
- A) Attempt team predictions with adjustments
- B) Skip team events entirely
- C) Predict individuals only (ignore teams)

What's the right approach?

---

*Discussion: BGA Scope | Zurich Classic Challenge | April 21, 2026*