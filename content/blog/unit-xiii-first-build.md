---
{
  "date": "2026-11-04",
  "author": "Scuderia Segfault",
  "draft": false,
  "title": "Building Unit XIII: the Serpent chassis and first bench setup",
  "summary": "Our starting hardware layout and how we plan to bring up the Hobbywing motor and VESC.",
  "tags": ["Unit XIII", "Hardware", "VESC"]
}
---

Unit XIII starts with a Serpent SRX8GTE R, a 1:8 electric GT chassis with four-wheel drive. This first entry records the build plan and the checks we want to run before the first track session.

## Where the hardware goes

| Area | Planned setup |
| --- | --- |
| Drivetrain | Hobbywing Xerun 4268SD G3 2400 KV motor and VESC 6 Mk6 HP. The layout needs space for cooling, motor leads and connector access. |
| Steering | Doyono DHS60 servo. We will check steering travel and mechanical clearance on the bench. |
| Sensing | RoboSense Airy LiDAR with a clear view, MicroStrain 3DM-GX5-25 IMU on a rigid mount, and Holybro H-Flow facing the ground. |
| Upper deck | ASUS NUC 15 Pro or NVIDIA Jetson. The ZED X Mini candidate needs a compatible GMSL2 capture path, so the camera and compute choice affect the deck layout. |

## Bringing up the motor and VESC

The first bench session will check wiring and motor direction with the wheels clear of the bench, then establish a baseline configuration in VESC Tool. We will record the firmware, motor detection result and configuration before comparing throttle and braking response. For each change, the log will capture the test conditions and available speed, current and temperature readings. Confirmed settings and track results will go into a follow-up note.

[Unit XIII project](../../projects/unit-xiii.html) · [All Unit XIII lab notes](../topics/unit-xiii.html) · [Serpent chassis reference](https://serpent.com/products/ser600074)
