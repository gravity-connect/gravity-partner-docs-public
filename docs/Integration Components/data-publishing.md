---
title: Data Publishing
sidebar_position: 5
---

# Data Publishing

After a device has been enrolled, the Device Partner will begin publishing data to the VPP's endpoints. The [VPP API](/vpp-api) guide describes the endpoints that accept device telemetry and configuration updates (referred to as signals and settings), command status updates, and device enrollment updates. These endpoints are authenticated using the `DEVICE_PUBLISH_SECRET` or `PROGRAM_PUBLISH_SECRET` (depending on the endpoint) to create an HMAC.

The required data fields vary based on the device type, such as:
* Hot Water Heaters: tank temperature, operating mode, power draw, etc.
* Thermostats: temperature setpoints, operating mode, ambient temperature, etc.
* Batteries: capacity, power flow, status, etc.

Each device type has a set of mandatory data fields that must be implemented, plus optional data fields that can be provided to improve reporting. See [Device Type Specifications](/docs/Integration%20Components/device-type-specifications) for the specifications for each device type.

Before finalizing an integration, the VPP will work with each Device Partner to verify that all required data points for a given device type are implemented correctly according to the specifications.

Having accurate and complete data publishing as per the documentation is critical for properly managing each device type within utility programs and optimizing distributed energy initiatives. The required fields for each device type integration must be confirmed before final approval.