---
{
  "date": "2026-11-06",
  "author": "Scuderia Segfault",
  "draft": false,
  "title": "Unit XIII: Power and Signal Schematic",
  "summary": "How the Serpent's VESC, 12 V converter, steering servo and USB-powered sensors are connected.",
  "tags": ["Unit XIII", "Hardware", "Wiring"],
  "cover": "uploads/uni13_logo.jpg"
}
---

This wiring overview maps the planned power and signal paths on our Serpent SRX8GTE R. Open the schematic to zoom in on the wire pairs, connector labels and converter pins.

[![Unit XIII wiring schematic showing the shared DC input, the VESC and motor phases, the 12 V converter and steering regulator, and the USB and CAN sensor connections.](../../uploads/unit-xiii-electrical-architecture.svg)](../../uploads/unit-xiii-electrical-architecture.svg)

## Power distribution

A LiPo or a lab DC supply feeds the main DC junction, one source at a time. The VESC connects directly to that junction and drives the motor through three phase wires. A separate branch feeds the isolated TRACO TEP 200-2412WIR, which takes 9–36 V DC and supplies 12 V at up to 15 A, subject to thermal derating. The 12 V rail feeds the LiDAR branch and the adjustable 7–8 V steering regulator. The VESC sends PWM to the servo over a separate signal connection with a shared reference. [TRACO datasheet](https://www.tracopower.com/tep200wir-datasheet)

## Sensor power and data

The onboard computer supplies 5 V through USB or a USB extender. The MicroStrain IMU uses USB for data as well. The Holybro H-Flow uses USB-derived power and a separate DroneCAN link through a USB–CAN adapter. The sketch also records candidate paths for Wi-Fi, radio control and wheel-speed sensing. [Holybro H-Flow documentation](https://docs.holybro.com/peripherals/h-flow-dronecan/overview)

The diagram records the intended harness layout. Connector pin order, protection, power limits and grounding still need to be checked against the installed components.

[Hardware Components](../unit-xiii-hardware-components/index.html) · [All Unit XIII Lab Notes](../topics/unit-xiii.html)
