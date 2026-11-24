---
title: HPRS
draft: false
order: 120
subtitle: ""
period: 2022–2025
category: Safe learning
status: Research archive
image: media/publications/hprs-hierarchical-potential-based-reward-shaping-from-task-specifications.webp
summary: HPRS turns safety, target and comfort requirements into a shaped reward for reinforcement learning.
people:
  - Edgar A. Aguilar
  - Luigi Berducci
  - Axel Brunnbauer
  - Radu Grosu
  - Dejan Ničković
keywords:
  - Reward Shaping
  - Safe Policy Improvement
videos:
  - FbDVjWtRwrE
sources:
  - label: Project page
    url: https://sites.google.com/view/hprewardshaping/
imageCredit: From the linked publication · 2025
imageCaption: Small race cars on an indoor track bounded by inflatable tubes, with an inset map of the track layout
imageSource: https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2024.1444188/pdf
---

Reinforcement learning follows its reward signal, so the reward should match the designer's requirements. Existing automatic methods struggle to produce rewards that train well and satisfy several different requirements at once.

HPRS treats a task as a partially ordered set of safety, target and comfort requirements and turns them into a sum of rewards that respects this order. Its potential-based form makes sparse rewards dense while keeping the optimal policy unchanged. On eight robotics benchmarks, HPRS produced policies that met the requirements, converged faster than the state of the art and needed no manual parameter tuning.
