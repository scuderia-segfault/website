---
title: MMDVS-LF
draft: false
order: 130
subtitle: ""
period: "2025"
category: Perception
status: Research archive
image: media/publications/mmdvs-lf-multi-modal-dynamic-vision-sensor-and-eye-tracking-dataset-for-line-following.webp
summary: A dataset of event-camera, eye-tracking, RGB, odometry and IMU recordings from people driving a small car along a line.
people:
  - Felix Resch
  - Monika Farsang
  - Radu Grosu
keywords:
  - MMDVS-LF
videos: []
sources:
  - label: Dataset paper
    url: https://arxiv.org/abs/2409.18038
imageCredit: From the linked publication · 2025
imageCaption: "Diagram of the recording setup: a driver with an eye tracker steers a small car while its sensors record events, video and actions"
imageSource: https://arxiv.org/pdf/2409.18038
repositories:
  - label: CPS-TUWien/mmdvs
    url: https://github.com/CPS-TUWien/mmdvs
    description: Repository for the multimodal vision dataset.
---

Dynamic vision sensors (DVS) record asynchronous events with high temporal resolution, which suits control tasks, but they are still rarely used in machine learning.

MMDVS-LF is a dataset recorded on a small-scale standardized vehicle during line following. It is the first to combine DVS recordings with eye-tracking data of the drivers. It also contains RGB video, odometry, IMU data and driver demographics. The dataset is meant to support the development of event-based deep learning algorithms.
