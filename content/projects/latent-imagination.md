---
title: Latent Imagination
draft: false
order: 50
subtitle: ""
period: 2021–2022 · ICRA 2022
category: World models
status: Research archive
image: media/publications/latent-imagination-facilitates-zero-shot-transfer-in-autonomous-racing.webp
summary: Model-based reinforcement learning that trains a LiDAR racing policy in simulation and transfers it zero-shot to a real F1TENTH car.
people:
  - Axel Brunnbauer
  - Luigi Berducci
  - Andreas Brandstätter
  - Mathias Lechner
  - Ramin Hasani
  - Daniela Rus
  - Radu Grosu
keywords:
  - Latent Imagination
  - Model-based deep
videos:
  - IlN3vJxC30w
  - AKYUsuFpPto
sources:
  - label: Paper and DOI
    url: https://doi.org/10.1109/ICRA46639.2022.9811650
imageCredit: From the linked publication · 2022
imageCaption: Race car on a track with its LiDAR scan, reward terms and motor and steering actions
imageSource: https://arxiv.org/pdf/2103.04909
repositories:
  - label: CPS-TUWien/racing_dreamer
    url: https://github.com/CPS-TUWien/racing_dreamer
    description: Implementation and experiments for Latent Imagination.
---

World models let reinforcement learning agents learn behavior in a latent imagination space, which makes training more sample-efficient. Their use in real-world robotics had received little study.

We set up time-lap tasks for an F1TENTH racing car with a LiDAR sensor, on test tracks of increasing complexity. Agents that learn in imagination outperformed model-free agents in performance, sample efficiency, task completion and generalization. Generalization depended strongly on the choice of observation model, and world models with long enough memory transferred from simulation to the real car without further training. The paper appeared at ICRA 2022.
