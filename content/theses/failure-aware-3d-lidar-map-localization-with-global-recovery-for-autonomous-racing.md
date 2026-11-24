---
title: 3D LiDAR Map Localization with Global Recovery
draft: false
order: 90
type: Master Thesis
summary: Localize the car in a prebuilt 3D track map in real time and recover when tracking is lost.
status: Open
project: learning-based-mpc
topics:
  - Autonomous racing
  - Master thesis
tasks:
  - Set up a fixed 3D reference map, calibration and ground-truth evaluation.
  - Implement a fast LiDAR–inertial scan-to-map localization baseline.
  - Estimate when the scan alignment can be trusted and when it cannot.
  - Add global relocalization and define when to switch between tracking and recovery.
  - Evaluate accuracy, recovery success and time, runtime and lap performance on our race car.
background:
  - Robotics, computer vision, control or computational engineering background.
  - 3D geometry, state estimation and point cloud registration.
  - C++/ROS preferred. Factor graphs, LiDAR odometry or global registration are a plus.
subject: "Thesis enquiry: 3D LiDAR Map Localization with Global Recovery"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

Once we have a 3D map, the car must localize in it quickly enough for racing control. Scan-to-map alignment gives precise 6-DoF poses but can fail on repetitive geometry, during hard manoeuvres or with a bad initial pose. The system should notice when its alignment is wrong, never silently accept a bad match, and recover globally. The map is fixed; building it is a separate thesis. The outcome is a real-time localization pipeline with confidence indicators and tested recovery.

## Supervision

Dr. Agnes Poks, Larisa Clement, Univ. Prof. Ezio Bartocci
