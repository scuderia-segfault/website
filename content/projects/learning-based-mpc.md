---
title: Learning-Based MPC
draft: false
order: 80
subtitle: ""
period: 2025–2026
category: Control
status: Research collection
image: media/publications/towards-safe-learning-based-non-linear-model-predictive-control-through-recurrent-neural-network-modeling.webp
summary: Neural approximations of nonlinear MPC that are trained without expert data and checked by a safety filter.
people:
  - Larisa Clement
  - Monika Farsang
  - Agnes Poks
  - Johannes Edelmann
  - Manfred Plöchl
  - Radu Grosu
  - Ezio Bartocci
keywords:
  - Safe Approximate Nonlinear Model Predictive
videos: []
sources:
  - label: Research preprint
    url: https://doi.org/10.48550/arXiv.2603.24503
imageCredit: From the linked publication · 2026
imageCaption: "Closed-loop trajectories for four benchmarks: robot arm, vehicle, quadcopter and chain of masses"
imageSource: https://arxiv.org/pdf/2603.24503
---

Nonlinear model predictive control (NMPC) solves an optimization problem at every step, which is costly in real time. Neural approximations are cheaper but usually need many expert NMPC solutions.

Seq-AMPC is a recurrent policy trained through the known dynamics without expert labels; a safety filter with a feasible backup plan checks each proposal. On four benchmarks, including a vehicle and a quadcopter, training took 0.2 to 1.7 GPU hours, 97.2 to 99.1% of proposals were applied, and closed-loop cost stayed within 0.3% of NMPC.
