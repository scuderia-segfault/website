---
title: Diffusion Models as Overtaking Priors for MPCC
draft: false
order: 120
type: Master Thesis
summary: Train a diffusion model to propose overtaking trajectories that an MPCC controller then refines and executes.
status: Open
project: learning-based-mpc
topics:
  - Autonomous racing
  - Master thesis
tasks:
  - Generate simulated racing trajectories labeled follow, setup, overtake (left/right) or abort.
  - Train a conditional diffusion model that proposes short trajectories for each manoeuvre.
  - Use the proposals as warm starts or references for MPCC.
  - Find how many samples fit the real-time budget on our race car.
  - Compare against MPCC without diffusion, and test on the car at low speed if feasible.
background:
  - Interest in generative models and model predictive control.
  - Experience with machine learning or optimization-based control is a plus.
subject: "Thesis enquiry: Diffusion Models as Overtaking Priors for MPCC"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

Overtaking has no single right answer: stay behind, attack inside, go around the outside, wait for the next straight, or abort. Diffusion models can learn such multimodal choices from data. Here the diffusion model does not steer the car. It suggests manoeuvre candidates, and MPCC still handles dynamics, track limits and collision avoidance. The outcome is a prototype with a trajectory dataset, a trained model and MPCC integration, showing whether these priors improve overtaking success or controller convergence.

## Supervision

Dr. Agnes Poks, Larisa Clement, Univ. Prof. Ezio Bartocci
