---
{
  "date": "2026-11-04",
  "author": "Scuderia Segfault",
  "draft": false,
  "title": "Unit XIII: Hardware Components",
  "summary": "The planned drivetrain, sensors and onboard computer for the Serpent build.",
  "tags": [
    "Unit XIII",
    "Hardware"
  ],
  "cover": "uploads/uni13_logo.jpg",
  "repositories": [
    {
      "label": "larisaclement/roboracer-arena-v1",
      "url": "https://github.com/larisaclement/roboracer-arena-v1",
      "description": "Track generation and Isaac Sim environments for RoboRacer Arena."
    },
    {
      "label": "CPS-TUWien/f1tenth_system",
      "url": "https://github.com/CPS-TUWien/f1tenth_system",
      "description": "Related F1TENTH vehicle software from CPS-TUWien."
    }
  ]
}
---

This note records the planned hardware for Unit XIII and the interfaces that shape the vehicle layout.

## Where the hardware goes

| Area | Planned setup |
| --- | --- |
| Drivetrain | Hobbywing Xerun 4268SD G3 2400 KV motor and VESC 6 Mk6 HP. The layout needs space for cooling, motor leads and connector access. |
| Steering | Doyono DHS60 servo. We will check steering travel and mechanical clearance on the bench. |
| Sensing | RoboSense Airy LiDAR with a clear view, MicroStrain 3DM-GX5-25 IMU on a rigid mount, and Holybro H-Flow facing the ground. |
| Upper deck | ASUS NUC 15 Pro or NVIDIA Jetson. The ZED X Mini candidate needs a compatible GMSL2 capture path, so the camera and compute choice affect the deck layout. |

## Sensors and vehicle data

The figures below are manufacturer specifications. The build plan lists the Airy, MicroStrain IMU and H-Flow. The Livox Mid-360 provides a comparison for the Airy.

- **RoboSense Airy** supplies 3D point clouds for mapping the track and locating the vehicle. The 96-channel version covers 360° horizontally and 90° vertically. [RoboSense manual](https://robosense-robotics.github.io/product-manual/en/Airy/)
- **Livox Mid-360** provides another 3D LiDAR reference, with 360° horizontal coverage, a vertical field of view from −7° to +52°, and 200,000 points per second on first return. Livox specifies 40 m range at 10% target reflectivity under 100 klx. It also has an integrated IMU. [Livox specifications](https://www.livoxtech.com/mid-360/specs)
- **MicroStrain 3DM-GX5-25** measures acceleration and angular velocity and provides filtered orientation. Its datasheet lists ±0.25° RMS roll and pitch accuracy for the EKF output. On the car, inertial measurements can help track motion between LiDAR scans. [MicroStrain datasheet](https://www.microstrain.com/sites/default/files/3dm-gx5-25_datasheet_8400-0093_rev_o.pdf)
- **Holybro H-Flow** combines optical flow, time-of-flight distance sensing and a six-axis IMU over DroneCAN. The optical-flow sensor has an effective viewing angle of up to 42°. Pointed at the floor, the module can help estimate motion relative to the ground. [Holybro specifications](https://holybro.com/products/h-flow)

The **VESC 6 MkVI HP** controls the motor and provides drivetrain telemetry for the bench log. It supports BLDC and field-oriented control. [TRAMPA technical data](https://trampaboards.com/vesc-6-hp--high-power-pcb-p-34613.html)

[Chassis Building](../unit-xiii-first-build/index.html) · [All Unit XIII lab notes](../topics/unit-xiii.html)
