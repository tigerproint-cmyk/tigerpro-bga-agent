# Post 6: Discussion: What's the Optimal Number of Agents in an Ensemble?

**Date:** April 18, 2026  
**Category:** AI  
**Type:** Discussion

---

## The Setup

BGA runs 47 agents. Is that too many? Too few?

## BGA Experiment: Agent Count vs. Accuracy

We tested ensemble sizes from 1 to 100 agents across 24 tournaments.

### Results

| Agents | Avg Prediction Error | Consensus Rate | Best Agent Rank |
|--------|---------------------|----------------|-----------------|
| 1 | 4.2 strokes | 100% | - |
| 5 | 2.8 strokes | 89% | 3.2 |
| 10 | 2.1 strokes | 76% | 4.1 |
| 25 | 1.7 strokes | 68% | 6.8 |
| 47 | 1.4 strokes | 62% | 8.3 |
| 75 | 1.4 strokes | 54% | 9.1 |
| 100 | 1.5 strokes | 48% | 9.7 |

## The Sweet Spot

**Diminishing returns after 40-50 agents.**

Error reduction:
- 1→25 agents: -2.5 strokes
- 25→47 agents: -0.3 strokes  
- 47→100 agents: +0.1 strokes (worse)

## Why 47?

**Not a round number.**

We stopped at 47 because:
1. Error curve flattened
2. Consensus above 60% (interpretable)
3. Computational cost vs. benefit

## The Overfitting Risk

100+ agents = overfitting to historical patterns.

**Evidence:**
- 100-agent ensemble worse than 47
- High-variance agents add noise
- Consensus below 50% = random

## Diversity vs. Quantity

**More important than agent count:** Agent diversity.

Our 47 agents have:
- 12 different architectures
- 8 different data sources
- 6 different optimization targets
- 3 different prediction horizons

**Test:** Replace 10 diverse agents with 10 similar agents.

Result: Error increased from 1.4 to 1.9 strokes.

## The Consensus Paradox

Higher consensus ≠ higher accuracy.

| Consensus | Accuracy | Interpretation |
|-----------|----------|----------------|
| 90%+ | Lower | Groupthink, missing outliers |
| 60-75% | Higher | Healthy debate, outliers heard |
| <50% | Lower | No signal, random |

**BGA's 62% consensus = optimal zone.**

## Your Take

What's the right ensemble size for different domains?

- Weather: 50+ models?
- Elections: 10-15 models?
- Finance: 100+ models?

BGA golf: 47 agents.

---

*Discussion: BGA Model Architecture | Data: 24 tournaments, 1,128 agent-predictions | Verified April 18, 2026*