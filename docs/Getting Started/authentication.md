---
title: Authentication
sidebar_position: 1
---

Gravity Connect uses the following authentication models:

**Requests from the VPP to the Device Partner's endpoints**
* These requests use OAuth 2.0 authentication. Please note that these OAuth credentials are required even if the homeowner enrollment flow is not OAuth-based. If the homeowner enrollment flow is OAuth-based, it can use separate credentials or it can re-use these.
* The Device Partner provides:
  * `clientId`: A program-specific ID.
  * `clientSecret`: A program-specific secret.

**Requests from the Device Partner to the VPP's endpoints**
* These requests authenticate using a combination of the following credentials and HMAC authentication. The VPP provides:
    * `PROGRAM_PUBLISH_KEY`: The unique identifier for a utility program, provided when a program is set up.
    * `PROGRAM_PUBLISH_SECRET`: The secret key used to generate HMAC signatures when publishing program-level data, provided when a program is set up.
    * `DEVICE_PUBLISH_SECRET`: The secret key used to generate HMAC signatures when publishing device-level data, provided when each device is enrolled.
* Find more detail about authenticating with the VPP's endpoints in the [VPP API Guide](./vp-api.html#section/Authentication).