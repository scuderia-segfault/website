---
title: Liquid Neural Networks
draft: false
order: 140
subtitle: ""
period: 2020–2026
category: Neural models
status: Research collection
image: media/publications/liquid-resistance-liquid-capacitance-networks-2026.webp
summary: Bio-inspired recurrent models, from liquid time-constant networks to liquid-capacitance networks and fast liquid state-space models.
people:
  - Monika Farsang
  - Mathias Lechner
  - Ramin Hasani
  - Daniela Rus
  - Radu Grosu
keywords:
  - Liquid
  - Neural Circuit
  - Chemical versus
  - Riccati
  - Reshape and Recur
videos: []
sources:
  - label: Author bibliography
    url: https://monifarsang.github.io/publications/
imageCredit: From the linked publication · 2026
imageCaption: Two dashcam frames of a road, at sunset and at night, with a predicted steering path drawn in blue
imageSource: https://arxiv.org/pdf/2403.08791
---

Recurrent networks for control should be compact and interpretable and still model complex dynamics. This line of work studies models inspired by biological neurons.

Liquid time-constant networks (LTCs) are continuous-time networks whose time constants vary with the hidden state; they show stable and bounded behavior. Liquid-resistance liquid-capacitance networks (LRCs) dampen the oscillations of LTCs and improve accuracy, tested on time-series benchmarks and an autonomous lane-keeping task. LrcSSM makes such a nonlinear model as fast to compute in parallel as linear state-space layers and outperformed Transformers, LRU, S5 and Mamba on long-range forecasting.

LrcSSM and liquid models are also used in our adaptive-control and domain-shift driving studies.
