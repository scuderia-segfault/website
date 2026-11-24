---
title: Nonlinear MPC on the GPU
draft: false
order: 50
type: Project Work
summary: Move our racing MPC to a GPU solver and find out where parallel computation actually helps.
status: Open
project: learning-based-mpc
topics:
  - Autonomous racing
  - 6–12 ECTS
tasks:
  - Benchmark the current CPU-based MPC as a baseline.
  - Implement the racing MPC in TurboMPC or a similar GPU framework.
  - Try one or two GPU strategies, such as batched multi-start optimization.
  - Find when the GPU beats the CPU for different horizons, models and batch sizes.
  - Test the controller in simulation and on our race car.
background:
  - Control, robotics, computational engineering or a related background.
  - Optimization and vehicle dynamics. Python, JAX, CUDA or C++ helps.
  - Interest in numerical algorithms. GPU programming experience is a plus, not a must.
subject: "Project enquiry: Nonlinear MPC on the GPU"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

Nonlinear MPC can use the tire limits better than simpler controllers, but its compute cost limits horizon length, model detail and replanning rate. GPU solvers like TurboMPC solve many problems in parallel and have been used in full-scale racing. We want to know where this pays off on a small car with limited compute, looking at solver latency, CPU–GPU transfer, power use and lap performance. The outcome is a working GPU MPC and a clear comparison with the CPU version.

## Supervision

Dr. Agnes Poks, Larisa Clement, Univ. Prof. Ezio Bartocci
