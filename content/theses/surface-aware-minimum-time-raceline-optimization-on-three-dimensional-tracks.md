---
title: 3D Raceline Optimization with Banking and Elevation
draft: false
order: 20
type: Project Work
summary: Extend our 2D raceline optimizer to tracks with elevation and banking.
status: Open
project: learning-based-mpc
topics:
  - Autonomous racing
  - 6–12 ECTS
tasks:
  - Review and document the current raceline code with its original developer.
  - Build a 3D track model with elevation, banking and curvature.
  - Add gravity and geometry-dependent acceleration limits to the optimization.
  - Compare the result with our 2D optimizer and TUM’s 3D raceline tool.
  - Test on non-planar track sections in simulation and, if practical, on our race car.
background:
  - Mechanical engineering, control, robotics or computational engineering background.
  - Vehicle dynamics, optimal control and numerical optimization.
  - Python, MATLAB, CasADi or C++. Differential geometry helps but is not required.
subject: "Project enquiry: 3D Raceline Optimization with Banking and Elevation"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

Our raceline tool treats the track as flat, so it ignores elevation, banking and off-camber turns. These change gravity and normal load, and with them the best path and speed profile. With a 3D LiDAR map we can describe the track as a 3D road. The outcome is a documented 3D version of the optimizer and a clear answer to when 3D geometry changes the path, speed or lap time. Testing needs a track section with elevation or banking.

## Supervision

Dr. Agnes Poks, Larisa Clement, Philipp Gratzer, Univ. Prof. Ezio Bartocci
