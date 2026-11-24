---
title: Learning from Human Attention
draft: false
order: 60
subtitle: ""
period: 2023 · ICRA RAP4Robots
category: Perception
status: Research archive
image: media/publications/attention-based-neural-network-for-autonomous-driving-agents.webp
summary: Predicting where a human driver looks and using that attention map as an extra input for robot learning.
people:
  - Daniel Scheuchenstuhl
  - Stefan Ulmer
  - Felix Resch
  - Luigi Berducci
  - Radu Grosu
keywords:
  - Human-Attention
  - Attention Based Neural
  - Attentional Neural
  - attention-based neural
videos: []
sources:
  - label: Open paper
    url: https://arxiv.org/abs/2308.15327
imageCredit: From the linked publication · 2023
imageCaption: Small-scale autonomous race car with a camera and onboard electronics
imageSource: https://repositum.tuwien.at/bitstream/20.500.12708/188073/1/Ulmer%20Stefan%20-%202023%20-%20Attention%20Based%20Neural%20Network%20for%20Autonomous%20Driving...pdf
repositories:
  - label: CPS-TUWien/learning_human_attention
    url: https://github.com/CPS-TUWien/learning_human_attention
    description: Dataset and preprocessing for human-attention experiments.
---

Learning from complex camera images is slow and can fail on unfamiliar data. Humans handle such scenes by focusing on a few points of interest.

We trained a model that predicts human attention from gaze recordings of real-world manual driving, and passed its output as an extra feature map to two tasks: object detection and imitation learning. With predicted attention, the models handled out-of-distribution samples better and learned faster when little data was available.

Three master's theses apply the idea to driving agents, dynamic object detection and autonomous racing. In the racing thesis, attention-based input selection gave faster lap times than a full-image controller.
