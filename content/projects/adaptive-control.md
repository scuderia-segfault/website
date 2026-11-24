---
title: Adaptive Recurrent Control
draft: false
order: 90
subtitle: ""
period: 2025–2026
category: Control
status: Research collection
image: media/publications/adaptive-control-in-autonomous-driving-via-real-time-recurrent-rl.webp
summary: Fine-tuning pretrained driving policies online, at every time step, with real-time recurrent reinforcement learning.
people:
  - Julian Lemmel
  - Felix Resch
  - Monika Farsang
  - Ramin Hasani
  - Daniela Rus
  - Radu Grosu
keywords:
  - Recurrent Reinforcement
  - Adaptive Control
  - Online Fine-Tuning
videos: []
sources:
  - label: Driving preprint
    url: https://doi.org/10.48550/arXiv.2602.02236
imageCredit: From the linked publication · 2026
imageCaption: Diagram of offline pre-training and real-time online fine-tuning, next to a RoboRacer car
imageSource: https://arxiv.org/pdf/2602.02236
---

Pretrained driving policies lose performance when conditions at deployment differ from training, for example through changed dynamics or sensor drift.

We fine-tune pretrained policies online with Real-Time Recurrent Reinforcement Learning (RTRRL), a memory-efficient algorithm that updates the policy at every time step without backpropagation through time. We extended RTRRL to LrcSSM, a nonlinear diagonal state-space model, and combined offline behavioral cloning with online fine-tuning. The approach was tested in the CarRacing simulation and on a RoboRacer car with an event camera during real-world line following. LrcSSM-based policies improved fastest and most consistently.
