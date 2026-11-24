---
title: Localization That Recovers from Failures
draft: false
order: 70
type: Master Thesis
summary: Improve our car’s localization so it notices its own errors and recovers from them.
status: Open
project: learning-based-mpc
topics:
  - Autonomous racing
  - Master thesis
tasks:
  - Find where the current particle filter and EKF fail, e.g. under wheel slip or dropouts.
  - "Compare alternatives: an improved particle filter, a fixed-lag smoother or a factor graph."
  - Add checks that keep unreliable measurements out of the estimate.
  - Add global relocalization with place recognition, possibly using ideas from BioSLAM.
  - Evaluate accuracy, recovery time and lap performance in simulation and on our race car.
background:
  - Robotics, mechatronics, control or computational engineering background.
  - Probabilistic estimation, coordinate transforms and sensor fusion.
  - Python or C++/ROS. Particle filters, Kalman filters or factor graphs are a plus.
subject: "Thesis enquiry: Localization That Recovers from Failures"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

Small pose errors become large tracking errors at racing speed. Our car uses a particle filter with an EKF. It works, but wheel slip, hard acceleration, repetitive track sections, sensor dropouts or a wrong initial pose can make it confidently wrong. The goal is localization that stays accurate during normal racing and recovers when it fails. It stays with 2D map-based localization and current sensors. The outcome includes a comparison showing when to keep, improve or extend the particle filter.

## Supervision

Dr. Agnes Poks, Larisa Clement, Univ. Prof. Ezio Bartocci
