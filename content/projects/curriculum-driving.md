---
title: Multi-Agent Driving Curricula
draft: false
order: 110
subtitle: ""
period: 2025 · ICRA
category: Safe learning
status: Research archive
image: media/publications/scenario-based-curriculum-generation-for-multi-agent-driving.webp
summary: MATS-Gym, a framework that generates multi-agent traffic scenarios and training curricula for autonomous driving in CARLA.
people:
  - Axel Brunnbauer
  - Luigi Berducci
  - Peter Priller
  - Dejan Ničković
  - Radu Grosu
keywords:
  - Scenario-Based Curriculum
videos: []
sources:
  - label: Publication DOI
    url: https://doi.org/10.1109/ICRA55743.2025.11128162
imageCredit: From the linked publication · 2025
imageCaption: Simulated city intersection with the trained car and surrounding traffic highlighted
imageSource: https://arxiv.org/pdf/2403.17805
---

Training driving policies needs many different traffic scenarios, but building scenarios with several heterogeneous agents by hand is slow, especially in detailed simulators.

MATS-Gym uses partial scenario specifications to generate traffic scenarios with a variable number of agents and runs them in the CARLA simulator. It connects scenario engines such as Scenic and ScenarioRunner with multi-agent training frameworks and models the interaction as a partially observable stochastic game. We combined it with unsupervised environment design to generate adaptive curricula, the first use of these algorithms in autonomous driving. The paper appeared at ICRA 2025 and is part of the ADEX project.
