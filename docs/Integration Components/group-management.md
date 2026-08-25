---
title: Group Management
sidebar_position: 100
---

Gravity Connect supports two options for targeting commands: individual devices and groups.

Grouping enables utilities to target collections of devices in demand response events, broadcasting a command to multiple enrolled devices simultaneously.

Device Partners who choose to support group commands must support the following workflows:
    1. One device could receive an individual command while also belonging to a group receiving a separate directive. The Device Partner is responsible for resolving conflicting commands.
    2. Devices can opt out of group events individually while the overall group command remains active.
    3. Group command statuses reflect execution at the scheduling engine level rather than device state.
    4. The Device Partner must reconcile group states and individual states to ensure consistency in reporting.

All other workflows behave identically for individual and grouped devices, including reporting telemetry data for individual devices.