---
title: Sideslip Estimation with Optical Flow Sensors
draft: false
order: 40
type: Project Work
summary: Estimate the car’s sideslip with downward-facing optical flow sensors and use it in our MPC.
status: Open
project: learning-based-mpc
topics:
  - Autonomous racing
  - 6–12 ECTS
tasks:
  - Mount and calibrate the optical flow sensors under the car.
  - Model the measurements, correcting for rotation and changes in pitch and roll.
  - Fuse optical flow with IMU, wheel speed and steering in an EKF, UKF or MHE.
  - Check the estimates against motion capture or another ground truth.
  - Feed the estimate into the MPC and refine the raceline limits.
background:
  - Mechanical engineering, control, mechatronics or signal processing background.
  - Vehicle dynamics and state estimation.
  - Python, MATLAB, embedded programming or ROS, and interest in hands-on sensor work.
subject: "Project enquiry: Sideslip Estimation with Optical Flow Sensors"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

Sideslip angle shows how close the car is to the grip limit, but our standard sensors cannot measure it. Model-based estimates get worse when tires or surface change, which is exactly when sideslip matters most. Downward optical flow sensors measure ground motion directly but are affected by height, attitude, texture and vibration. The outcome is a calibrated sensor setup, an estimator with known accuracy and failure cases, and a test of whether sideslip feedback helps near the limit.

## Supervision

Dr. Agnes Poks, Larisa Clement, Univ. Prof. Ezio Bartocci
