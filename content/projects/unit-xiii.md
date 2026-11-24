---
title: Unit XIII
draft: false
order: 30
subtitle: ""
period: Vehicle development
category: Vehicle engineering
status: Team project
image: uploads/uni13_wordmark.jpg
imageCaption: Unit XIII wordmark
imageCredit: Scuderia Segfault / TrustCPS
summary: Our next autonomous race car, built on the 1:8 Serpent SRX8GTE R electric GT chassis with four-wheel drive.
people:
  - Larisa Clement
  - Samuel Lechner
  - Piet Kaul
  - Philipp Gratzer
  - Agnes Poks
  - Luca (CPS)
keywords:
  - RoboRacer Arena
videos: []
sources:
  - label: Serpent chassis reference
    url: https://serpent.com/products/ser600074
labNotes: unit-xiii
repositories:
  - label: larisaclement/roboracer-arena-v1
    url: https://github.com/larisaclement/roboracer-arena-v1
    description: Track generation and Isaac Sim environments for RoboRacer Arena.
  - label: scuderia-segfault/scuderia_gymnasium
    url: https://github.com/scuderia-segfault/scuderia_gymnasium
    description: Scuderia racing simulation repository.
photos:
  - file: uni13_build_chassis.jpg
    caption: Serpent chassis during assembly
  - file: uni13_sensores.jpg
    caption: Sensor and motor-controller hardware overview
---

Unit XIII is the next car in our fleet. It is built on the Serpent SRX8GTE R (SER600074), a 1:8 electric GT chassis with four-wheel drive.

The drive pairs a Hobbywing Xerun 4268SD G3 2400 KV motor with a VESC 6 Mk6 HP controller. The planned sensors are a RoboSense Airy LiDAR, a MicroStrain IMU and a ground-facing Holybro H-Flow. For onboard compute, an ASUS NUC 15 Pro and an NVIDIA Jetson are being compared.

RoboRacer Arena covers the simulation side: it turns validated track maps into Isaac Sim environments for training and testing.
