---
title: Integration Testing
sidebar_position: 8
---

# Integration Testing

Integrations are evaluated on the following workflows.

## Enrollment & Unenrollment
* Device enrolls in the VPP program
* Device unenrolls from the VPP program

## Telemetry
* Device shares all required data points for the device type
* Device shares power data in 5-minute increments or shares Energy Interval data

## Events
* Device successfully responds to group events, if applicable
* Device successfully responds to individual device events, if applicable
* Device successfully responds to cancelling an individual device event, if applicable
* Device successfully responds to cancelling a group event, if applicable
* Device signals for modes and command statuses align with test events before, during, and after the event window
* Device signals change in the correct direction relative to test event commands
* Device opts out of individual device event using [publish device command status endpoint](./vp-api.html#operation/publishDeviceCommand)
* Device opts out of group event using [command opt-out](./vp-api.html#operation/commandOptOut)