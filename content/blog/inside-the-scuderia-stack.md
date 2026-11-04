---
{
  "date": "2026-11-02",
  "author": "Scuderia Segfault",
  "draft": false,
  "title": "Inside the Scuderia stack",
  "summary": "A short tour from sensor inputs to vehicle commands.",
  "cover": "uploads/scuderia-system-architecture.png",
  "tags": [
    "Engineering note",
    "Control"
  ],
  "repositories": [
    {
      "label": "CPS-TUWien/f1tenth_system",
      "url": "https://github.com/CPS-TUWien/f1tenth_system",
      "description": "Related F1TENTH vehicle software from CPS-TUWien."
    },
    {
      "label": "ScuderiaSegfault/t2v_mod",
      "url": "https://github.com/ScuderiaSegfault/t2v_mod",
      "description": "Related Track-to-Vehicle communication module."
    }
  ]
}
---

An autonomous racing car is a chain of connected decisions. This architecture overview from our working materials shows how sensing, state estimation, planning and control fit together.

![Scuderia Segfault system architecture: sensing, state estimation, local planning, control synthesis and actuation](../../uploads/scuderia-system-architecture.png)

*Diagram: Scuderia Segfault working materials.*

## From observations to actions

IMU and LiDAR measurements feed the state-estimation side of the stack. A precomputed map, optimized raceline and vehicle parameters provide additional context.

Local planning combines the raceline with obstacle information. The control side includes model predictive control, an Ackermann command path and acceleration control, before commands reach the motor and steering hardware.

The useful part of a system diagram is the interfaces: which estimates, targets and commands each component needs from the others. It gives us a common language for discussing the whole vehicle.

[Explore the research behind the car](../../research.html)

## From the lab track

![Indoor track with obstacles for mapping and localization](../../uploads/blog_slam_team.jpg)

![Workbench with cars and equipment beside the indoor track](../../uploads/blog_work_1.jpg)
