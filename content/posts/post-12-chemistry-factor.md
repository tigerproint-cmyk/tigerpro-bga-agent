# Post 12: Build Log #23: How We Measure 'Partner Chemistry' for Team Events

**Date:** April 22, 2026  
**Category:** AI  
**Type:** Build Log

---

## The Problem

Zurich Classic requires team predictions. Chemistry matters. How do we measure it?

## BGA Proxy Approach

Since direct chemistry data doesn't exist, we use proxies.

### Proxy 1: Past Team Experience

**Metric:** Rounds played together in prior team events

| Experience Level | Adjustment | Teams (2026) |
|-----------------|------------|--------------|
| Never played | 0% | 12 teams |
| 1-2 events | +3% | 8 teams |
| 3+ events | +6% | 4 teams |

**Data source:** Zurich Classic history (2017-2025)

### Proxy 2: Play Style Compatibility

**Metrics compared:**
- Driving distance similarity
- Approach proximity average
- Scrambling percentage
- Putting strokes gained

**Compatibility Score:**
```
compat = 1 - (|p1_stat - p2_stat| / avg_stat)
```

| Score | Adjustment |
|-------|------------|
| <0.5 | -2% (clash) |
| 0.5-0.7 | 0% (neutral) |
| 0.7-0.9 | +2% (good fit) |
| >0.9 | +4% (excellent fit) |

### Proxy 3: Temperament Match

**Based on:**
- Round-to-round variance (consistency)
- Pressure coefficient under Sunday stress
- Comeback performance (resilience)

**Logic:** Similar temperaments = better communication

| Match | Adjustment |
|-------|------------|
| Both aggressive | +3% |
| Both conservative | +2% |
| Mixed | 0% |

### Proxy 4: Major Winner Bonus

**Hypothesis:** Major winners handle pressure better as a team.

| Team Composition | Adjustment |
|-----------------|------------|
| 0 major winners | 0% |
| 1 major winner | +2% |
| 2 major winners | +5% |

## The Chemistry Formula

```javascript
chemistry_score = 
  (experience_adj * 0.3) +
  (style_adj * 0.35) +
  (temperament_adj * 0.25) +
  (major_adj * 0.1)
```

**Weight rationale:**
- Style fit most important (35%)
- Experience second (30%)
- Temperament third (25%)
- Major status least (10%)

## Validation Plan

**Test on Zurich Classic 2026:**
- Predict with chemistry factor
- Compare to individual aggregation
- Track accuracy vs. baseline

**If chemistry improves predictions >5%:** Keep factor.  
**If <5%:** Remove, use individual aggregation.

## 2026 Zurich Top Teams (BGA)

| Team | Chemistry Score | Win Prob |
|------|----------------|----------|
| Scheffler/McIlroy | 0.87 | 8.2% |
| Spieth/Thomas | 0.91 | 7.8% |
| Rahm/Hovland | 0.82 | 6.4% |
| Åberg/Theegala | 0.79 | 5.9% |

**Note:** Wide confidence bands. Experimental predictions.

---

*Build Log #23 | Chemistry Factor v0.1 | Experimental | April 22, 2026*