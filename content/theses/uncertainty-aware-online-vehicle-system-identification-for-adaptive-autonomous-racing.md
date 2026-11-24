---
title: Online Vehicle Parameter Estimation While Racing
draft: false
order: 80
type: Master Thesis
summary: Estimate changing tire, steering and drivetrain parameters while driving and feed them to the MPC.
status: Open
project: learning-based-mpc
topics:
  - Autonomous racing
  - Master thesis
tasks:
  - Pick a few parameters that can really be identified, e.g. tire stiffness or actuator delay.
  - Design safe test maneuvers and an offline reference identification.
  - Implement a recursive estimator with uncertainty, parameter bounds and update checks.
  - Send fast updates to the MPC and slower ones to the raceline optimizer.
  - Test in simulation and on our race car under changing conditions.
background:
  - Control, mechanical engineering, mechatronics or computational engineering background.
  - Vehicle dynamics, parameter estimation and system identification.
  - Python or MATLAB. Recursive estimation, optimization or MPC is a plus.
subject: "Thesis enquiry: Online Vehicle Parameter Estimation While Racing"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

Our raceline optimizer and MPC need an accurate vehicle model, but we identify its parameters once before racing. Tire wear and temperature, friction, battery voltage, payload or hardware changes make it drift. Estimating too many coupled parameters gives unstable models, so this thesis keeps the set small and keeps updates from destabilizing the controller. The outcome is an online identification pipeline, an answer to which parameters can be tracked during racing, and an improvement under at least one changing condition.

## Supervision

Dr. Agnes Poks, Larisa Clement, Univ. Prof. Ezio Bartocci
