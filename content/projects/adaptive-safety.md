---
title: Learning Adaptive Safety
draft: false
order: 100
subtitle: ""
period: 2024 · ICRA
category: Safe learning
status: Research archive
image: media/publications/learning-adaptive-safety-for-multi-agent-systems.webp
summary: Learning control barrier function parameters together with the policy, to keep multi-robot systems and racing agents safe.
people:
  - Luigi Berducci
  - Shuo Yang
  - Rahul Mangharam
  - Radu Grosu
keywords:
  - Learning Adaptive Safety
videos:
  - NDOsWzt1xWo
sources:
  - label: Open paper
    url: https://arxiv.org/abs/2309.10657
  - label: Project page
    url: https://luigiberducci.github.io/research/asrl.html
imageCredit: From the linked publication · 2024
imageCaption: Diagram of racing cars whose observations feed a learned policy and a CBF safety filter
imageSource: https://arxiv.org/pdf/2309.10657
---

Safety in multi-agent systems is hard because little is known about the other agents. Control barrier functions (CBFs) can enforce safety, but current methods make strong assumptions about other agents and need manual tuning.

We showed that the CBF configuration strongly changes the emergent behavior. ASRL is an adaptive safe reinforcement learning framework that learns both the policy and the CBF coefficients by interacting with other agents, keeping cost violations below a set limit. It was evaluated in a multi-robot system and in competitive multi-agent racing, against learning-based and control-theoretic approaches. The paper appeared at ICRA 2024.
