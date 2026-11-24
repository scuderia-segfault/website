---
title: Real-Time RGB-D Obstacle Detection and Tracking
draft: false
order: 60
type: Master Thesis
summary: Build a fast obstacle detector and tracker that combines color and depth images on the car.
status: Open
project: learning-based-mpc
topics:
  - Autonomous racing
  - Master thesis
tasks:
  - Define which obstacles to detect and record a labeled RGB-D test set.
  - Calibrate and sync the color and depth streams, and study depth errors while driving.
  - Implement fast depth-based detection, for example ground removal and clustering.
  - Compare RGB-only, depth-only and fused approaches.
  - Add tracking, run the best pipeline onboard and test it in closed loop.
background:
  - Computer vision, robotics, embedded systems or computational engineering background.
  - Camera geometry, image processing and machine learning.
  - Python, C++/ROS or PyTorch. ONNX or TensorRT is a plus.
subject: "Thesis enquiry: Real-Time RGB-D Obstacle Detection and Tracking"
source: https://www.trustcps.eu/join.html
sourceLabel: Scuderia topic catalogue
provenance: User-supplied Computer Engineering topic catalogue, 2026-11-02
---

## About

Our current detector is simple and works in controlled demos but can fail when obstacles look different, depth is noisy or the car moves fast. Missed obstacles are dangerous; false alarms slow the car needlessly. Color helps recognize objects and depth helps separate them from the ground. For racing, latency and stable tracking matter as much as per-frame accuracy. The outcome is a pipeline that runs on our race car within a fixed latency budget, plus a labeled test set.

## Supervision

Dr. Agnes Poks, Larisa Clement, Univ. Prof. Ezio Bartocci
