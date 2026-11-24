---
title: RoboRacer Arena
draft: false
order: 40
subtitle: ""
period: 2026 · preprint submitted to ICRA 2027
category: Simulation
status: Research project
image: media/publications/roboracer-arena.webp
imageCaption: "Pipeline diagram: track input, environment generation, policy training in Isaac Sim and tests on the physical track"
imageCredit: Clement, Poks & Bartocci (2026)
imageSource: https://arxiv.org/abs/2608.23040
summary: A pipeline that turns track requirements into validated maps and Isaac Sim environments for training and testing racing policies.
people:
  - Larisa Clement
  - Agnes Poks
  - Ezio Bartocci
keywords:
  - RoboRacer Arena
videos: []
sources:
  - label: Current paper and abstract
    url: https://arxiv.org/abs/2608.23040
parentId: unit-xiii
repositories:
  - label: larisaclement/roboracer-arena-v1
    url: https://github.com/larisaclement/roboracer-arena-v1
    description: Track generation and Isaac Sim environments for RoboRacer Arena.
clips:
  - file: roboracer_arena.mp4
    title: RoboRacer Arena demonstration
---

Learning-based racing needs many training tracks, but each new track needs geometric design, validation and simulation assets. This makes track geometry hard to vary in experiments.

RoboRacer Arena starts from natural-language requirements, generates closed-loop layouts, validates the occupancy maps and builds the matching Isaac Sim environments. It also accepts recorded maps and scaled circuits, giving a first collection of 130 tracks. Eight benchmark maps were converted into simulation assets in under 2.5 seconds each.

We rebuilt our RoboRacer car as a CAD and USD asset. On the physical car, policies trained in the Arena completed ten consecutive laps at commanded speeds up to four times the training speed.
