# Introduction
This is the documentation for the endpoints implemented by Virtual Power Plants (VPPs) for integrating devices with the Gravity Connect API.

The endpoints that a Device Partner implements are described in the [Device Partner Guide](/device-partner-api).

# Changelog
Below are any noteworthy changes to the API spec.

* 2.0.6 - Revised the explanatory sections of the documentation.
* 2.0.5 - Added Device Partner Driven Enrollment.
* 1.2.2 - Added maximum payload size
* 1.2.1 - Clarifying command status vs device command status reporting
* 1.2.0 - Clarifying that auth header is Authorization not Authentication
* 1.1.0 - Adding pairingCode as an optional field for `Publish device enrollment`
* 1.0.1 - Fixing the `device` key in the `Publish device enrollment status` to refer to the device details rather than just the kind of device

# Authentication
Gravity Connect uses the following authentication models:

**Requests from the VPP to the Device Partner's endpoints**
* These requests use OAuth 2.0 authentication. Please note that these OAuth credentials are required even if the homeowner enrollment flow is not OAuth-based. If the homeowner enrollment flow is OAuth-based, it can use separate credentials or it can re-use these.
* The Device Partner provides:
  * `clientId`: A program-specific ID.
  * `clientSecret`: A program-specific secret.

**Requests from the Device Partner to the VPP's endpoints**
* These requests authenticate using a combination of the following credentials and HMAC authentication. The signature validation allows Gravity Connect endpoints to be called only by authorized parties in possession of the valid `PUBLISH_SECRET`.
  * The VPP provides:
    * `PROGRAM_PUBLISH_KEY`: The unique identifier for a utility program, provided when a program is set up.
    * `PROGRAM_PUBLISH_SECRET`: The secret key used to generate HMAC signatures when publishing program-level data, provided when a program is set up.
    * `DEVICE_PUBLISH_SECRET`: The secret key used to generate HMAC signatures when publishing device-level data, provided when each device is enrolled.

To authenticate with the VPP's endpoints:
1. Construct the payload body for the API request.
2. Generate an HMAC hash on the request body content using the `PROGRAM_PUBLISH_SECRET` or `DEVICE_PUBLISH_SECRET`, as specified for that endpoint.
3. Set the Authorization header with the signature.

Example: `Authorization: Publish 12345abcdef`
  * Where 12345abcdef is the HMAC hash.
  * See the HMAC generation script below for sample code.

## HMAC Script
The below script is an example of how to generate an HMAC for some payload in javascript. Other languages should have standard crypto libraries that work similarly.

```javascript
const crypto = require('crypto');

const secret = 'your_secret_here';
const body = `{
  \"uid\": \"your_device_uid\",
  \"kind\": \"TSTAT\",
  \"signal\": [{
    \"key\": \"mode\",
    \"value\": \"HEAT\",
    \"time\": \"2021-01-28T15:36:48.586697\"
  }],
  \"setting\": [{
    \"key\": \"max-setpoint\",
    \"value\": 31.0,
    \"time\": \"2020-10-20T22:10:57.101616\"
  }]
}`;

const computedHMAC = crypto.createHmac('sha256', secret).update(body).digest('hex');
console.log(`Publish ${computedHMAC}`);
```

# Error Handling
For the following error codes, please retry using exponential backoff:
* 429
* 502
* 503
* 504

All other requests that receive an error should be discarded.