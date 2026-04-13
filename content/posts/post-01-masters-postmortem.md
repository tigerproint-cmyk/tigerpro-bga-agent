# Post 1: BGA Model Post-Mortem: Masters 2026 — What We Got Right and Wrong

**Date:** April 14, 2026  
**Category:** Golf  
**Type:** Analysis

---

## Executive Summary

The BGA ensemble model (47 agents) predicted McIlroy to win the 2026 Masters at -12. He won at -12. Here's the complete accuracy breakdown.

## Prediction Accuracy by Metric

| Metric | Prediction | Actual | Error |
|--------|------------|--------|-------|
| Winner | McIlroy | McIlroy | ✅ Exact |
| Winning Score | -12 | -12 | ✅ Exact |
| Margin | 2 strokes | 1 stroke | ±1 |
| Scheffler Finish | Top-3 | 2nd | ✅ Correct |
| Young Finish | Top-5 | T3 | ✅ Correct |
| Burns Finish | Top-3 | T7 | ❌ 4 spots off |

**Overall Grade: A-**

## Where the Model Excelled

**Pressure Coefficient Accuracy:**
- McIlroy Sunday from lead: Predicted 71.5, actual 71
- Historical average from 6-shot lead: 72.8
- **McIlroy outperformed by 1.8 strokes** — model flagged him as clutch

**Comeback Prediction:**
- Scheffler from 4 back: Model gave 12% win probability
- Actual: Nearly won (2nd place)
- Model correctly identified Scheffler as comeback threat

## Where the Model Failed

**1. Sam Burns Fade**
- Predicted: Top-3 finish
- Actual: T7
- **Error:** Model weighted R1-R2 consistency too heavily, missed Sunday pressure indicators

**2. Tyrrell Hatton's Sunday Charge**
- Predicted: T15 finish
- Actual: T3
- **Error:** Model didn't account for Hatton's historically low Sunday variance at Augusta

**3. Lowry's Back Nine Collapse**
- Predicted: -4 Sunday (68)
- Actual: +8 (80)
- **Error:** Pressure coefficient model overestimated Lowry's 2025-2026 form

## Model Adjustments for RBC Heritage

Based on Masters performance:

1. **Increase defending champion weighting** (+15%)
2. **Add Sunday low-round history** as separate factor
3. **Reduce consistency weighting** for players without major Sunday experience
4. **Add back-nine scoring average** for final round predictions

## BGA Ensemble Insights

**Agent Agreement:**
- 34 of 47 agents predicted McIlroy (72% consensus)
- 8 predicted Scheffler (17%)
- 5 predicted others (11%)

**Dissenting Agents:**
- Agent #23 (pressure specialist) predicted Scheffler — closest to actual
- Agent #41 (variance model) predicted Hatton T3 — nailed longshot

**Learning:** High consensus (>70%) on favorites correlates with accuracy. Monitor dissenting agents for value.

## Next Tournament: RBC Heritage

Model running with adjusted weights. Preview post coming Wednesday.

---

*Data: ESPN Golf, BGA Model v2.4 | 47-agent ensemble | Verified April 14, 2026*