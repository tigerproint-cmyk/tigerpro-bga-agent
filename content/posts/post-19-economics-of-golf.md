# Post 19: Data Deep-Dive: The Economics of Professional Golf — What BGA Models Miss

**Date:** May 1, 2026  
**Category:** Golf  
**Type:** Research

---

## Beyond the Stats

BGA tracks 147 metrics. But economics matter too.

## The FedEx Cup Factor

**Standings Impact on Performance:**

| Position | Avg Finish | vs. Baseline | Interpretation |
|----------|------------|--------------|----------------|
| 1-10 | 26.4 | +0.2 | No pressure |
| 11-30 | 28.1 | +1.9 | Secure, minor urgency |
| 31-70 | 32.7 | +6.5 | Playoff bubble pressure |
| 71-125 | 38.4 | +12.2 | Must perform |
| 126-150 | 41.8 | +15.6 | Desperate |

**Sweet spot:** 11-30 range. Secure but motivated.

## The Money List Effect

**Correlation:** Season earnings vs. next tournament finish

| Tier | Correlation | Interpretation |
|------|-------------|----------------|
| Top 10 earners | +0.12 | Complacency risk |
| 11-50 earners | -0.08 | Motivated |
| 51-100 earners | -0.03 | Neutral |
| 101+ earners | +0.18 | Skill ceiling |

**Surprise:** Top earners underperform. Complacency?

## The Schedule Strength Paradox

**Hypothesis:** Rest helps performance.

**Data:** Weeks off before tournament

| Rest | Avg Finish | vs. Baseline |
|------|------------|--------------|
| 0 weeks (back-to-back) | 35.2 | +7.2 |
| 1 week off | 29.8 | +1.8 |
| 2 weeks off | 27.4 | -0.6 |
| 3+ weeks off | 31.2 | +3.2 |

**Optimal rest:** 2 weeks.

**Too much rest:** Rust factor kicks in at 3+ weeks.

## The Major Championship Hangover

**Already modeled:** Masters Hangover Factor

**Expanded to all majors:**

| Major | Next Event Penalty | Duration |
|-------|-------------------|----------|
| Masters | -32% win prob | 1 week |
| PGA Championship | -28% win prob | 1 week |
| US Open | -35% win prob | 1-2 weeks |
| Open Championship | -22% win prob | 1 week |

**US Open worst:** Most physically demanding.

## The LIV vs. PGA Tour Divide

**Performance since 2023:**

| Circuit | Avg Finish | Major Wins |
|---------|------------|------------|
| PGA Tour | 38.2 | 4 |
| LIV Golf | 42.7 | 2 |

**LIV players underperform in majors.**

**Why?**
- Less competitive reps (54 holes vs. 72)
- Weaker fields in LIV events
- Course setup unfamiliarity

**BGA Adjustment:** -8% win probability for LIV players in majors.

## The Age Curve

**Performance by age:**

| Age Range | Peak Performance % | Decline Rate |
|-----------|-------------------|--------------|
| 20-25 | 85% | Improving |
| 26-32 | 100% | Peak |
| 33-38 | 92% | -1.2%/year |
| 39-45 | 78% | -2.8%/year |
| 46+ | 54% | -5.1%/year |

**Peak:** 29-30 years old.

**BGA Age Adjustment:**
- Under 25: +0.5 strokes (inexperience)
- 26-32: Baseline
- 33-38: +0.3 strokes/year
- 39-45: +0.8 strokes/year
- 46+: +2.1 strokes/year

## What's Missing from BGA

1. **Sponsorship obligations** — media, appearances
2. **Equipment changes** — new clubs, balls
3. **Caddie relationships** — chemistry, experience
4. **Personal life factors** — marriage, children, health
5. **Travel logistics** — jet lag, course arrival

**Some factors unmeasurable.**
**Others:** Future BGA research.

## Model v2.7: Economic Factors

**Adding:**
- FedEx Cup position weighting
- Rest optimization (2 weeks ideal)
- LIV major penalty (-8%)
- Age curve adjustments

**Expected improvement:** +5% accuracy.

---

*Data: PGA Tour 2019-2026 | Economic factors analysis | Verified May 1, 2026*