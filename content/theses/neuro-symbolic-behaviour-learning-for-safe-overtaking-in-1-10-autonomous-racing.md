---
title: Learning Safe Overtaking Rules (Neuro-Symbolic)
draft: false
order: 130
type: Master Thesis
summary: Learn interpretable overtaking rules that decide when to follow, attack or abort.
status: In progress
project: learning-based-mpc
topics:
  - Autonomous racing
  - Master thesis
tasks:
  - Define racing predicates in Frenet coordinates, such as free gap and time-to-collision.
  - Train a neural network to estimate these predicates from recent states and track data.
  - Combine them with differentiable logic (e.g. Logic Tensor Networks) into manoeuvre decisions.
  - Connect the decisions to MPCC by adjusting its targets and costs.
  - Compare with rule-based and black-box approaches in simulation, and on the car if feasible.
background:
  - Good Python skills.
  - PyTorch, sequence models, reinforcement learning or MPC is a plus.
  - Formal logic helps but is not required.
subject: "Thesis enquiry: Learning Safe Overtaking Rules (Neuro-Symbolic)"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

Neural policies can learn overtaking but are hard to interpret and check. Here neural networks estimate simple predicates like “gap on the left is free”, and a differentiable logic layer turns them into manoeuvres such as follow, set up, overtake or abort. The rules start as priors and are tuned from data. MPCC still handles dynamics and safety constraints. The outcome is an interpretable decision layer and an analysis of which rules matter most for safe overtaking.

## Supervision

Dr. Agnes Poks, Larisa Clement, Univ. Prof. Ezio Bartocci
