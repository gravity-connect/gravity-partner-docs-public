---
title: Device Unenrollment
sidebar_position: 6
---

If a device is unenrolled from a VPP program via the Device Partner's app or portal, the device partner notifies the VPP via the [publish device enrollment](./vp-api.html#operation/publishDeviceEnrollment) endpoint. The payload should include the device UID and a status of \"unenrolled\". The VPP will remove the device from the program and no longer collect data or call events on the device.

If a program manager unenrolls a device via the VPP platform, the VPP will call the Device Partner endpoint to [unsubscribe](./vp-api.html#tag/Devices/operation/modifySubscription) from the device's data. The Device Partner should interpret the unsubscription as an unenrollment.
