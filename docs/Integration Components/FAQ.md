---
title: FAQ
sidebar_position: 100
---

# FAQ

## How far in advance can commands be scheduled? How long can commands last?
Commands are sent in the 60 seconds before the start time and will not exceed a 24 hour duration. Commands with a start time in the past should still be considered valid so long as the current time is within the duration.

## What is the difference between device installation, enrollment, subscription, and registration?

* Devices that are purchased in advance may be allocated to a program, but not yet installed (sometimes referred to as "commissioned" or "provisioned").
* An enrolled device has been approved to participate in a VPP program. 
* Subscription refers to whether the VPP is currently receiving data for that device. 
    * When modifying the subscription of a device, the payload includes a parameter that specifies whether to `register` or `unregister` the device. "Registered" and "subscribed" are effectively the same.

## How does the device partner know which `PROGRAM_PUBLISH_KEY` and `PROGRAM_PUBLISH_SECRET` to use when publishing data?
The VPP will provide a unique `PROGRAM_PUBLISH_KEY` and `PROGRAM_PUBLISH_SECRET` for new programs. The Device Partner should associate new devices with the program so that it can use the correct program credentials.

## How frequently should device data be published to the VPP?
Telemetry data in the lists of \"signals\" and \"settings\" should be published between every 5 and every 15 minutes. This data should contain 5 minute intervals for continuous signals. Categorical signals and settings that change infrequently can be updated only on change.

This does not apply to energy interval data (see [Energy Interval Data](/docs/Integration%20Components/energy-interval-data)).

## My device publishes data that doesn't correspond to an existing signal or setting. What should I do with it?
The signal and setting lists are constantly evolving. Please contact the Gravity Connect team with suggestions for updating the specification.

## What's the difference between the command status and the device command status?
Device command status is for a specific device. Command status is used for groups of devices.
 
For individual device commands, use only the device command status endpoint.

For group commands, the command status reflects the state of the command at a scheduling engine level. For example, `OPT_OUT` would not apply and a status of `FAILED` means there was an issue scheduling the command as a whole. If a particular device's status does not reflect the greater command status (e.g., an individual device fails or opts out), report that difference via the device command status. Device command status that is the same as the current command status does not need to be reported.

## Does `/subscription` control Command Status and Device Command Status publishing to the VPP?
No, this endpoint only controls the sending of signals and settings. In the case that an unsubscribed device is targeted by a command (which is not an expected situation), the response data should not be reported to the VPP.
