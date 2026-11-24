---
title: Physics-Informed Liquid Neural Networks for Vehicle Dynamics
draft: false
order: 110
type: Master Thesis
summary: Combine a physical vehicle model with a Liquid neural network residual and use it in MPC.
status: Open
project: learning-based-mpc
topics:
  - Autonomous racing
  - Master thesis
tasks:
  - Set up a lateral/yaw single-track model with a suitable tire model.
  - Identify its parameters from new or existing driving data of our race car.
  - Train an MLP and a Liquid residual (LRC or LrcSSM) on the remaining model error.
  - Compare physical, learned and hybrid models on accuracy, plausibility, data needs and runtime.
  - Use the best model in our MPC/MPCC and test it in simulation and on the car.
background:
  - Mechanical or computational engineering background.
  - Physical modeling and parameter estimation; Python or MATLAB.
  - Basic neural network fine-tuning helps. No Liquid network experience needed.
subject: "Thesis enquiry: Physics-Informed Liquid Neural Networks for Vehicle Dynamics"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

Single-track models are interpretable but miss tire and actuator effects near the limit. Data-driven models capture these but need more data and generalize poorly. Here the physical model does most of the work and a compact Liquid neural network learns only what is left. The thesis covers lateral/yaw dynamics on our race car, tested open-loop and inside an existing MPC/MPCC. The outcome is an interpretable hybrid model that predicts better than the physical baseline and still runs in real time.

## Supervision

Dr. Agnes Poks, Larisa Clement, Monika Farsang, Univ. Prof. Ezio Bartocci
