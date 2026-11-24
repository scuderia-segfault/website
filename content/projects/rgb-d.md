---
title: Depth Matters
draft: false
order: 70
subtitle: ""
period: 2025–2026
category: Perception
status: Research collection
image: media/publications/depth-matters-multimodal-rgb-d-perception-for-robust-autonomous-agents.webp
summary: Adding depth to camera images to steer small-scale autonomous cars, with lightweight models that run on the car.
people:
  - Larisa Clement
  - Monika Farsang
  - Felix Resch
  - Mihai Stanusoiu
  - Radu Grosu
  - Ezio Bartocci
keywords:
  - Depth Matters
  - RGB-D
  - Domain-Shift
videos: []
sources:
  - label: Depth Matters preprint
    url: https://arxiv.org/abs/2503.16711
imageCredit: From the linked publication · 2025
imageCaption: Overhead view of the indoor test track with obstacles, carpet, a light beam and other test features labelled
imageSource: https://arxiv.org/pdf/2503.16711
repositories:
  - label: larisaclement/multimodal-rgbd-agents
    url: https://github.com/larisaclement/multimodal-rgbd-agents
    description: Related RGB-D research implementation.
---

Agents that steer from camera images alone need efficient models that keep working under noise and changing conditions.

We collected data on a small-scale autonomous car driven by an expert with a physical steering wheel, and trained lightweight recurrent controllers on fused RGB and depth input. Depth improved steering prediction over RGB alone. On the real car, the models avoided static and dynamic obstacles under out-of-distribution conditions, and early fusion of depth kept the controller working with frame drops and added noise.

A follow-up workshop paper trains liquid and gated recurrent networks on indoor small-scale driving data and tests them in an outdoor full-scale environment.
