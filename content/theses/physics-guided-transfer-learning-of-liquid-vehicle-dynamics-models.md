---
title: Adapting Liquid Neural Network Vehicle Models to New Conditions
draft: false
order: 100
type: Master Thesis
summary: Adapt a physics-plus-Liquid vehicle model to new tires, friction or payload with little new data.
status: Open
project: learning-based-mpc
topics:
  - Autonomous racing
  - Master thesis
tasks:
  - Start from our hybrid physics and Liquid model and pick one change, e.g. friction.
  - Record a small dataset under the new condition.
  - Compare updating the physical parameters, fine-tuning the Liquid residual, or both.
  - Measure prediction error, physical consistency and how much data is needed.
  - Test the best model with an existing predictive controller on our race car.
background:
  - Mechanical or computational engineering background, with Python or MATLAB.
  - Physical modeling and parameter estimation. Basic neural network fine-tuning helps; no Liquid network experience needed.
  - Interest in hands-on experiments with our race cars.
subject: "Thesis enquiry: Adapting Liquid Neural Network Vehicle Models to New Conditions"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

A vehicle model tuned for one setup loses accuracy when tires, friction, payload or the car itself change. Retraining from scratch ignores that most of the physics stays the same and needs a lot of data. We start from a physical model with a pretrained LRC/LrcSSM residual, introduce one change on our race car, and ask which part to adapt. The outcome is a reproducible transfer workflow and a clear answer: update the physics, the Liquid residual, or both.

## Supervision

Dr. Agnes Poks, Larisa Clement, Monika Farsang and Prof. Ezio Bartocci
