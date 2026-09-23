# Introduction
Welcome to the Gravity Connect API documentation for Device Partners (typically Device OEMs). This developer guide outlines the API endpoints and integration capabilities that Device Partners need to implement to connect their distributed energy resource (DER) devices with a virtual power plant (VPP) platform or a DERMS solution. The Device Partner endpoints work in combination with [the VPP's Gravity Connect endpoints](/vpp-api) to support device enrollment and real-time control.

After building the endpoints described in this guide, Device Partners can add their products to the VPP's customers' programs. Utilities will use the VPP's platform and suite of device integrations to access real-time data and control smart devices as part of VPPs, demand response programs, and/or DER management programs.

This documentation is open-source, and we encourage all DERMS and VPP platforms to use this standard. Integrations built to the Gravity Connect API standard are not limited to use with one VPP platform.

# About Gravity Connect

Gravity Connect is an open API specification developed by Virtual Peaker to simplify and accelerate the integration of distributed energy resource (DER) devices into utility demand response (DR) and DER management programs.

Gravity Connect offers several key benefits to Device Partners:
* **Streamlined device integration:** Gravity Connect provides standardized endpoints and data models to enable quick, easy integration of your devices with VPP platforms.
* **Accelerated time-to-value:** With simplified integrations via Gravity Connect, you can get your devices connected to DR programs faster, allowing utilities to control and access data from your devices sooner. This means faster time-to-value.
* **Open and interoperable:** Gravity Connect uses modern API best practices and is openly published to facilitate integration. It is designed to be vendor-agnostic so your devices can integrate with any VPP or DERMS platform that implements the specification.
* **Large ecosystem access:** VPP platforms that use Gravity Connect have relationships with dozens of utilities that run DR programs. Integrating via Gravity Connect gives your devices access to this large ecosystem of potential customers and programs.
* **Standardized device control:** As VPPs launch advanced control software to improve utility event operations, Gravity Connect will continue to standardize control commands so that each improvement does not require modifications to each integration.

Gravity Connect simplifies and streamlines the process of integrating DER devices into utility programs by handling the complexity behind a standardized and interoperable API. By partnering with VPPs using a Gravity Connect integration, your devices can access a large ecosystem of utility customers and programs quickly and easily.

## Articles About Gravity Connect
* [API Showdown: Gravity Connect v. OpenADR](https://virtual-peaker.com/blog/gravity-connect-v-openadr/)
* [How the Gravity Connect API Enhances OEMS & DERMS Integrations](https://virtual-peaker.com/blog/gravity-connect-api-oem-derms-integrations/)
* [Virtual Peaker Launches Gravity Connect API](https://virtual-peaker.com/news/virtual-peaker-launches-gravity-connect-api/)

## Interested in Getting Started with Gravity Connect?
If you're an OEM, utility, DERMS provider, or technology provider interested in learning more about integrating with Gravity Connect, our team is here to help.

To get started and discuss your use case, please reach out to our Gravity Connect support team at [gravity-connect@virtual-peaker.com](gravity-connect@virtual-peaker.com).

# Changelog
This list tracks noteworthy changes to the API specification.

* 2.0.6 - Revised the explanatory sections of the documentation.
* 2.0.5 - Added Device Partner Driven Enrollment.
* 2.0.4 - Updated power and energy signals in the TSTAT device-specific definition.
* 2.0.3 - Updated the command and signals in the TSTAT device-specific definition.
* 2.0.2 - Add `unsubscribe` from Device publishing as VP method of unenrollment. And, updated diagrams and and minor typo fixes.
* 2.0.1 - Major updates to documentation including the `Energy Interval` endpoint.
* 1.5.2 - Fixed using incorrect `baseUrl` to correct `vpBaseUrl` in VP Endpoints of Postman Collection.
* 1.5.0 - Adding specification for EVSE device type with signals, settings, and commands.
* 1.4.1 - Adding storage HVAC device type and FAQs. Clarifying startTime may be in past. Making deviceUids array optional when creating group.
* 1.4.0 - Clarifying CTA modes (including swapping NORMAL in for RUN_NORMAL) and cta-op-modes.
* 1.3.3 - Requiring country when houses are published to device partner. Specifying country field follows ISO 3166-1 alpha-2 (contrary to previous documentation which reference `USA` as a value).
* 1.3.2 - Adding an optional array of devices when publishing houses.
* 1.3.0 - Adding endpoint for individual devices to opt out of a group command.
* 1.2.0 - Adding Publish houses for installation endpoint under a new pairing code based onboarding flow. Also clarifying pairing code structure and international addresses.
* 1.1.0 - Adding Pairing Code Device Discovery as a proposal. Also clarifying that 1 program = 1 utility.
* 1.0.1 - `invalidDevices` was listed under the request body for `Update group details`, but it was meant to be under the response. Fixed this.

# Getting Started

## Endpoint Architecture
The remainder of this guide describes the Device Partner endpoints, which are half of the integration. Meanwhile, the [VPP API](/vpp-api) guide outlines the API endpoints hosted by the VPP for receiving data from the Device Partner's devices. The endpoints support standard integration operations, including publishing device signals, command statuses, and device enrollment events. In combination with the Device Partner endpoints, they allow a two-way flow of information that enables utilities to control and manage devices.

This data enables essential capabilities like:
* Real-time device monitoring and analytics
* Aggregation of fleet data across a utility
* Execution of demand response events and commands
* Accurate measurement and verification of event performance

Having a standardized set of endpoints for data intake simplifies integration significantly compared to custom development. Device Partners simply publish data in the documented format to stream it to the VPP's platform.

Learn more about the data flows in the [Integration Overview](#section/Getting-Started/Device-Partner-Integration-Overview).

## Glossary
* **Device Partner**: The party working to integrate with the VPP. This may be an OEM or a company creating digital solutions for devices.
* **Program**: An arrangement where a utility controls homeowners' devices in exchange for incentives such as rebates or gift cards. Multiple Device Partners typically participate in each program.
* **PROGRAM_PUBLISH_KEY**: The identifier for a program, unique to each combination of program and Device Partner.
* **PROGRAM_PUBLISH_SECRET**: The secret used as an input to HMAC for publishing program data to the VPP.
* **DEVICE_PUBLISH_SECRET**: The secret used as an input to HMAC for publishing device data to the VPP.
* **Signals and Settings**: The device telemetry and configuration data that is streamed to the VPP. See the [Device Type Specifications](#section/Device-Type-Specifications) for a specific list of the signals and settings required for each device type.
* **VP_COMMAND_OBJECT**: A portion of the payload sent to the Device Partner when the VPP sends a command. For more information about the commands required for each device type, see the [Device Type Specifications](#section/Device-Type-Specifications). For details about the command request, see the [Send Command Endpoint](#operation/sendCommand).
* **OAuth 2.0**: An open authorization framework that enables applications to obtain limited access to user accounts on an HTTP service, such as for device onboarding. It works by delegating user authentication to the service that hosts the user account, and authorizing third-party applications to access the user account. Gravity Connect uses OAuth 2.0 for device enrollment and for all requests from the VPP to the Device Partner, such as commands.
* **Webhook**: A method for apps to provide other applications with real-time information. When an event occurs, a HTPP POST callback is sent to the specified webhook URL endpoint. Gravity Connect uses webhooks for Device Partners to publish data updates instead of the VPP polling for data.

## Building an Integration

A new Device Partner typically integrates with a VPP's Gravity Connect API following this process:

1. **Kickoff Meeting:** the VPP and the Device Partner discuss which device types and programs this integration will be used for initially, which affects which enrollment flows and data models will be implemented.
2. **Onboarding:** the VPP provides the Device Partner with access to a development environment.
4. **Implementation:** The Device Partner implements the required Gravity Connect endpoints based on the documentation and earlier discussions about the scope of the integration.
5. **QA:** After the Device Partner has tested the integration, the VPP performs a final round of testing to validate the functionality and data flows.
6. **Beta Launch:** The integration goes live for the first customer, and the Device Partner can begin enrolling devices into the utility program. These devices begin streaming data shortly after enrollment and are ready to participate in events. The VPP and the Device Partner monitor the first enrollments to ensure success.
7. **Go Live:** After the integration has operated smoothly for a period of time, it becomes available to other customers and utility programs.

## Postman Collection
To use Postman to interact with endpoints, download the [Postman Collection](./Gravity%20Connect%20API.postman_collection.json). After file opens hit Mac(command + s) or Windows(control + s) to save the file and download it to your computer.

### Postman Setup
1. Download the file linked [here](./Gravity%20Connect%20API.postman_collection.json).
2. Open Postman and select `Import` near the top right of the left side panel menu.
3. Select `Upload Files` and select the Postman Collection you downloaded earlier.
4. Upon successful import it will create a collection Called `Gravity Connect API` with two main folders inside called `VP Endpoints` and `Device Partner Endpoints`.

### Device Partner Endpoints
The collection uses Postman’s built in authentication handling to authenticate the request. Below are the steps to configure and request a new token, which will then be automatically included in subsequent requests.
1. Select the `VP Endpoints` folder.
2. Set the following:
	* Set `Type` to `OAuth2.0` and `Add auth dat to` to `Request Headers`.
	* Enter `Token Name` to what you want it to be called.
	* Set `Grant Type` to `Client Credentials`.
	* Use the  `Client ID` and `Client Secret` you created within your application.
	* Set the `Access Token URL` to the auth endpoint for your application.
	* Set `Client Authentication` to `Send as Basic header`.
	* Leave any remaining fields to their default setting.
3. Click `Get New Access Token` button.
4. If all was successful it should pop up a confirmation the token was successfully created. Click use token and you are ready to begin accessing the endpoints.

### Device Partner Endpoints (OAuth Onboarding)
We haven’t used the Postman collection for these endpoints yet, but we expect that using the Authorization Code flow will work something like:
1. Select the `OAuth Onboarding` folder.
2. Set the following:
	* Set `Type` to `OAuth2.0` and `Add auth dat to` to `Request Headers`.
	* Enter `Token Name` to what you want it to be called.
	* Set `Grant Type` to `Authorization Code`.
	* Use the  `Client ID` and `Client Secret` you created within your application.
	* Set the scope to the scope that your application expects for our use case.
	* Set the `Access Token URL` and `Auth URL` to your urls.
	* Set the `Callback URL` to the VPP’s URL.
	* Set `Client Authentication` to `Send as Basic header`.
	* Leave any remaining fields to their default setting.
3. Click `Get New Access Token` button.
4. If all was successful it should pop up a confirmation the token was successfully created. Click use token and you are ready to begin accessing the endpoints.

### Authentication for VPP Endpoints
Attached to the VPP endpoints is a script that will automatically create an HMAC and set it as a variable that is then used to make the request. These scripts expect that you’ve properly set the PROGRAM_PUBLISH_KEY, PROGRAM_PUBLISH_SECRET, DEVICE_PUBLISH_SECRET.

To do this:
1. Click on the root folder for the Gravity Connect API. Then select the tab `Variables`
2. Find the variable and update the `CURRENT_VALUE`

# Integration Flows

![diagram of system connection](assets/diagrams/system-connection.png)
[See larger image](assets/diagrams/system-connection.png)

# Authentication
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
* Find more detail about authenticating with the VPP's endpoints in the [VPP API Guide](/vpp-api#section/Authentication).

# Device Enrollment
Each device will be added to a program using one of the following flows. After a device is added, the VPP will call the `/subscription` endpoint on the Device Partner's API to enable device data publishing and share the `DEVICE_PUBLISH_SECRET`.

The flows most suitable for device owners to enroll devices are:
1. OAuth Device Discovery
2. Pairing Code Device Discovery

The flows most suitable for installers or program managers to enroll devices are:
1. Device Partner Driven Enrollment
2. Pairing Code Device Discovery

## Pairing Codes

Pairing codes are used in some enrollment flows to link device enrollments to homeowner enrollments to ensure accurate device association. The format is:

- **2 alphanumeric characters** denoting the pairing code prefix representing the program (e.g., `A1`)
- **5 random numeric characters** (e.g., `12345`)
- **1 check digit** (Luhn algorithm, calculated from the 5 random numeric characters, e.g., `5`)

**Example:** `A1123455`


### How to Validate a Pairing Code
1. Extract the first 2 alphanumeric characters to validate them against program pairing code prefix.
2. Extract the 5 random numeric characters (characters 3–7).
3. Calculate the Luhn check digit using the standard algorithm.
4. Compare the calculated digit to the last digit (character 8).

The device partner can validate the pairing code to provide immediate feedback. The VPP's API can perform the same validation upon receipt of a pairing code.

## OAuth Device Discovery (Preferred)
[Diagram](https://d1byei05mtwnfj.cloudfront.net/apidocs/workflow/oauth-device-discovery.jpg)

In this flow, a device owner fills out an enrollment form hosted by the VPP, then logs in to their Device Partner account to grant the VPP permission to access and control their devices.

The OAuth device discovery flow works as follows:
1. The device owner fills out an onboarding form on the VPP's site.
2. At the end of the form, the device owner is redirected to the Device Partner's OAuth authorization page via a link.
3. The user logs into the Device Partner's app and grants OAuth access permissions.
4. The Device Partner app completes the OAuth authorization code flow, exchanging the code for an access token.
5. Using the access token, the Device Partner calls their API to retrieve the user's devices.
6. The Device Partner associates the devices with the correct VPP program in their backend and completes any other required internal onboarding logic.
7. The Device Partner completes the OAuth callback to the VPP.
8. The VPP discovers devices using the OAuth token provided.
9. The VPP subscribes to devices for data publishing and provides a DEVICE_PUBLISH_SECRET.

The VPP creates a unique `client_id` for each utility program. This ID is passed in the OAuth link to associate devices with the correct program.

When a customer onboards via the OAuth flow, we will direct them to a URL in the format below with:

* Your domain substituted for example.com
* Our domain substituted for gravity.example.com
* The `client_id` of the program the user is onboarding to
* A state generated by us to track the flow
* The scopes required within your system
* access_type=offline as per to indicate that a refresh token should be provided ([reference](https://developers.google.com/identity/protocols/oauth2/openid-connect#access-type-param))

```
https://example.com/oauth2/authorize?access_type=offline&response_type=code&redirect_uri=https%3A%2F%2Fgravity.example.com%2Foauth2%2Fcallback&client_id={}&state={}&scope={}
```

## Pairing Code Device Discovery - End User App
[Diagram](https://d1byei05mtwnfj.cloudfront.net/apidocs/workflow/end-user-app.jpg)

In this flow, a device owner fills out an enrollment form hosted by the VPP, which then presents them with a pairing code. The device owner then informs the Device Partner of their pairing code, which the Device Partner sends to the VPP with information about the device owner's devices. The VPP uses the pairing code to match the devices to the correct enrollment form data.

The [pairing code](#section/Pairing-Codes) device discovery flow works as follows:
1. The device owner fills out an onboarding form on the VPP's site.
2. The form provides them with a pairing code and instructions to enter it in the Device Partner's app.
3. The device owner enters the pairing code in the Device Partner's app, and the Device Partner publishes a device enrollment event to the VPP's API.
    1. The publish event includes the pairing code, allowing the VPP to match the devices to the correct enrollment form data.
    2. If multiple devices are enrolled for this device owner, the Device Partner sends multiple publish payloads with the same pairing code.
4. The VPP subscribes to each device for data publishing and provides a `DEVICE_PUBLISH_SECRET`.

Each utility program is assigned a different pairing code prefix that Device Partners can use to identify or confirm which program a device owner is joining.

## Device Partner Driven Enrollment
[![Device Partner Driven Enrollment Diagram](assets/diagrams/device-partner-driven-enrollment.png)](assets/diagrams/device-partner-driven-enrollment.png)

Device Partner Driven Enrollment is a flow that can be used when the Device Partner has enough information about both the devices and the site to form a complete record in the VPP platform. This includes data such as the device UID, the service address, and the device owner's contact information.

The Device Partner can use this flow to proactively enroll devices through the Device Partner's app/website, pre-enroll a device purchased directly from the Device Partner, and bulk enroll devices that are transferred to the VPP.

1. The Device Partner publishes an enrollment message containing information about the site and each of the eligible devices. This enrollment message uses the program-specific credentials for the appropriate program.
2. The VPP subscribes to the devices for data publishing and provides a `DEVICE_PUBLISH_SECRET` for each.
3. If the enrollment application is approved, there will be no change. If the enrollment application is rejected by the utility, the VPP will unsubscribe from data publishing.

## Pairing Code Device Discovery - Utility Commissioned Installation (Deprecated)
[Diagram](https://d1byei05mtwnfj.cloudfront.net/apidocs/workflow/utility-commissioned-installation.jpg)

This flow has been deprecated. The [Device Partner Driven Enrollment](#section/Device-Onboarding/Device-Partner-Driven-Enrollment) flow is recommended for programs where the device owner is not involved in the enrollment process, such as direct install programs.

The utility commissioned [pairing code](#section/Pairing-Codes) flow works as follows:
1. The device owner fills out an onboarding form on the VPP's site.
2. The utility reviews the submission and approves it if eligible.
3. The VPP informs the Device Partner of the service address and provides a pairing code.
4. The Device Partner installs and activates the device.
5. When the installation is complete, the Device Partner publishes a device enrollment event to the VPP.
    1. The publish event includes the pairing code, allowing the VPP to match the devices to the correct enrollment form data.
    2. If multiple devices are enrolled for this device owner, the Device Partner sends multiple publish payloads with the same pairing code.
4. The VPP subscribes to each device for data publishing and provides a `DEVICE_PUBLISH_SECRET`.

# Data Publishing
After a device has been enrolled, the Device Partner will begin publishing data to the VPP's endpoints. The [VPP API](/vpp-api) guide describes the endpoints that accept device telemetry and configuration updates (referred to as signals and settings), command status updates, and device enrollment updates. These endpoints are authenticated using the `DEVICE_PUBLISH_SECRET` or `PROGRAM_PUBLISH_SECRET` (depending on the endpoint) to create an HMAC.

The required data fields vary based on the device type, such as:
* Hot Water Heaters: tank temperature, operating mode, power draw, etc.
* Thermostats: temperature setpoints, operating mode, ambient temperature, etc.
* Batteries: capacity, power flow, status, etc.

Each device type has a set of mandatory data fields that must be implemented, plus optional data fields that can be provided to improve reporting. See [Device Type Specifications](#section/Device-Type-Specifications) for the specifications for each device type.

Before finalizing an integration, the VPP will work with each Device Partner to verify that all required data points for a given device type are implemented correctly according to the specifications.

Having accurate and complete data publishing as per the documentation is critical for properly managing each device type within utility programs and optimizing distributed energy initiatives. The required fields for each device type integration must be confirmed before final approval.

# Demand Response Event Commands
[Diagram](https://d1byei05mtwnfj.cloudfront.net/apidocs/workflow/demand-reponse-event-flow.jpg)

## Scheduling and Canceling

When a utility sends a command using the VPP's platform, the VPP [sends a command to the Device Partner](#operation/sendCommand) targeting a specific device or a group (if group management is supported). See [Device Type Specifications](#section/Device-Type-Specifications) for the commands for each device type. 

As not all device models support all commands, while building the integration, the Device Partner must inform the VPP of which models support which commands. The types of commands accepted must be consistent per device type + kind. For example, if the Acme Corporation is a device partner who sets up a hot water heater (kind = `HWH`) with a model name of ACME1000 (type = `ACME1000`), all ACME devices of kind `HWH` and type `ACME1000` must support the same set of commands, but this set can be different than the command set supported by model `ACME1001`.

Throughout the duration of a command, devices continue to send data to the VPP. Commands also [publish their status](/vpp-api#operation/publishCommand). For group commands, an individual device may need to report that it opted out (separate from the status of the command status), which it reports via the [device command status endpoint](/vpp-api#operation/publishDeviceCommand).

The VPP can cancel any command that has been sent to a Device Partner using the [cancel endpoint](#operation/cancelCommand). The VPP may cancel active commands at any point during their duration. The Device Partner should immediately return devices to normal operating modes when a cancellation command is received.

Commands are sent from the VPP to the Device Partner at most 60 seconds before the start time, regardless of the VPP interface supporting program managers scheduling events hours or days in advance. The Device Partner must be able to accept both individual and group commands simultaneously for a given device.

## Device Data for Events

The active operating mode of a device must align with the requested command mode if the device is participating in an event. For example, a water heater cannot report it is in 'NORMAL' mode if it is actively participating in a demand response event that calls for a ‘SHED’ (but it can if it has opted out of the event). The current mode should be updated accordingly as commands begin and end. Throughout each event, enrolled devices continue publishing telemetry data to the VPP's platform through the standard publishing endpoints.

Individual devices report opt-outs via the VPP endpoint [publish device command status endpoint](/vpp-api#operation/publishDeviceCommand). For group commands, individual devices report opt-out status, as needed, via the Device Partner endpoint [command opt-out](/vpp-api#operation/commandOptOut).

Properly syncing modes and command statuses is crucial for accurate measurement and verification of demand response performance. The Device Partner integration must maintain consistency between the active command, device mode, and device command status.

## Opting Out of Events
For demand response events targeting individual devices, opt-out status should be reported using the VPP endpoint [publish device command status endpoint](/vpp-api#operation/publishDeviceCommand) endpoint.

This allows the Device Partner to share the specific UID of the device that has opted out. The payload should include the UID along with a status of \"OPT_OUT\" and relevant timestamp.

For group commands, the group-level Device Partner endpoint [command opt-out](/vpp-api#operation/commandOptOut) should be used, and not the individual device opt-out endpoint. The group command status should be updated to \"OPT_OUT\" to indicate a specific or set of specific devices in the group has opted out.

The Device Partner API needs to implement both individual and group opt-out flows:
* Individual devices: Report opt-out via the VPP endpoint [publish device command status endpoint](/vpp-api#operation/publishDeviceCommand) endpoint
* Group commands: Report that particular devices within a group have opted out via group-level Device Partner endpoint [command opt-out](/vpp-api#operation/commandOptOut)

Properly reporting opt-out status at both the individual device and group level allows the VPP to update event logs and measurement & verification accordingly.

# Device Unenrollment
If a device is unenrolled from a VPP program via the Device Partner's app or portal, the device partner notifies the VPP via the [publish device enrollment](/vpp-api#operation/publishDeviceEnrollment) endpoint. The payload should include the device UID and a status of \"unenrolled\". The VPP will remove the device from the program and no longer collect data or call events on the device.

If a program manager unenrolls a device via the VPP platform, the VPP will call the Device Partner endpoint to [unsubscribe](/vpp-api#tag/Devices/operation/modifySubscription) from the device's data. The Device Partner should interpret the unsubscription as an unenrollment.

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
* Device opts out of individual device event using [publish device command status endpoint](/vpp-api#operation/publishDeviceCommand)
* Device opts out of group event using [command opt-out](/vpp-api#operation/commandOptOut)

# Device Type Specifications
Definitions for `SIGNAL_KEY`, `SIGNAL_VALUE`, `SETTING_KEY`, and `VP_COMMAND_OBJECT` all depend on the type of device (`DEVICE_TYPE_ENUM`) interfacing with the Gravity Connect API. This section will outline those values per device type.

NOTE: `VP_COMMAND_OBJECT` is only a portion of what is sent during an event. For the full payload, please see the [Send Command](#operation/sendCommand) endpoint.

## Battery
### Battery Command Payloads (VP_COMMAND_OBJECT)
#### Standby
```json
{
    mode: 'STANDBY'
}
```

#### Charge
```json
{
  mode: 'CHARGE',
  action: 'POWER',
  power: 4000
}
```

```json
{
  mode: 'CHARGE',
  action: 'FASTEST'
}
```

#### Discharge
```json
{
  mode: 'DISCHARGE',
  action: 'POWER',
  power: 4000
}
```

```json
{
  mode: 'DISCHARGE',
  action: 'SITE_DEMAND',
  targetSiteDemand: 400
}
```

```json
{
  mode: 'DISCHARGE',
  action: 'SITE_DEMAND',
  targetSiteDemand: 400,
  maxPower: 10000
}
```

### Battery Signals
{{battery_signals}}

### Battery Settings
{{battery_settings}}

## HWH

### HWH Command Payloads (VP_COMMAND_OBJECT)
#### Shed
```json
{
  mode: 'SHED'
}
```

#### Load Up
```json
{
  mode: 'LOAD_UP'
}
```
#### Critical
```json
{
  mode: 'CRITICAL'
}
```

#### Emergency
```json
{
  mode: 'EMERGENCY'
}
```

#### Run Normal
```json
{
  mode: 'RUN_NORMAL'
}
```

#### Advanced Load Up (Optional)
Where `energy` is an integer for Wh and `suggestedEfficiencyLevel` is an integer between 1 (representing low efficiency/fast heat up) and 9 (for high efficiency/slow heat up), or 10 for vacation mode.
```json
{
  mode: 'ADVANCED_LOAD_UP',
  energy: 1000
  suggestedEfficiencyLevel: 1
}
```

#### Efficiency (Optional)
Where `suggestedEfficiencyLevel` is an integer between 1 (representing low efficiency/fast heat up) and 9 (for high efficiency/slow heat up), or 10 for vacation mode.
```json
{
  mode: 'EFFICIENCY',
  suggestedEfficiencyLevel: 1
}
```

#### Duty Cycle (Optional)
Percentage ranges from 0-100
```json
{
  mode: 'DUTY_CYCLE',
  percentage: 60
}
```

### HWH Signals
{{hwh_signals}}

### HWH Settings
{{hwh_settings}}

## TSTAT
#### Temperature Units
As described in the following specification, all temperatures are sent and received in units of Fahrenheit for consistency. However, these temperatures can be displayed in Celsius to users in appropriate locales.

### TSTAT Command Payloads (VP_COMMAND_OBJECT)
#### Adjust Set Point
```json
{
  mode: 'HEAT',
  temperature: -2.0
}
```

* This command accepts relative values only.
* The setpoint command is always processed as relative to the homeowner’s setpoint. For example, if the homeowner’s setpoint is currently 75, and the VPP receives a command for -3 followed by a command for -2, the second command sets the setpoint to 73, not to 70.
* Mode
    * Valid values
        * HEAT
        * COOL
    * Note that while other values can be sent as Signals, only these values will be sent in commands.
* Temperature
    * Unit: degrees Fahrenheit
    * Sign: For all modes, positive is an increase in temperature and negative is a decrease in temperature


### TSTAT Signals
{{tstat_signals}}

### TSTAT Settings
{{tstat_settings}}

## EVSE
### EVSE Command Payloads (VP_COMMAND_OBJECT)
#### Standby
This puts the EV Charger in an idle state.
```json
{
  mode: 'STANDBY'
}
```

#### Dispatch - Limit Power
Limit the charging power to the set `power` limit, in units or Watts.
```json
{
  mode: 'DISPATCH',
  action: 'LIMIT_POWER',
  power: 1000
}
```

#### Dispatch - Percent Shed
```json
{
  mode: 'DISPATCH',
  action: 'PERCENT',
  limitPercent: 100
}
```

### EVSE Signals
{{evse_signals}}

### EVSE Settings
{{evse_settings}}

## V2G
### V2G Command Payloads (VP_COMMAND_OBJECT)
#### Charge
```json
{
  mode: 'CHARGE',
  action: 'POWER',
  power: 4000
}
```

```json
{
  mode: 'CHARGE',
  action: 'FASTEST'
}
```

#### Discharge
```json
{
  mode: 'DISCHARGE',
  action: 'POWER',
  power: 4000
}
```

```json
{
  mode: 'DISCHARGE',
  action: 'SITE_DEMAND',
  targetSiteDemand: 400
}
```

```json
{
  mode: 'DISCHARGE',
  action: 'SITE_DEMAND',
  targetSiteDemand: 400,
  maxPower: 10000
}
```

### V2G Signals/Settings
### V2G Signals
{{v2g_signals}}

### V2G Settings
{{v2g_settings}}


## Device Authentication
 Most of the device partner's endpoints will utilize the [device_partner_api_auth](#section/Authentication/device_partner_api_auth) authentications. The only exception is the [OAuth Device Discovery](#tag/OAuth-Device-Discovery-(Preferred)) endpoint which uses [device_partner_user_auth](#section/Authentication/device_partner_user_auth).

 For information on how to authenticate when publishing data to the VPP, please see the [Authentication section](/vpp-api#section/Authentication) for those endpoints.

# Energy Interval Data

## Purpose
The Energy Interval endpoint collects energy interval data from devices, except low-voltage thermostats that do not record power data. Unlike other device telemetry, which is published to the VPP, energy intervals are polled by the VPP.

This data is more accurate than energy data that a VPP platform can compute from power data.

Providers typically use this data for:
* Performance reporting
* Historical analysis
* Resource planning
* Incentive program disbursement

## Endpoint Query Parameters
* `start` and `end` use the same format as specified elsewhere for Gravity connect (as they are in the sample URL above)
   * `start` is inclusive, `end` is exclusive
   * The response should include all intervals that overlap with this window
* `duration` = duration of each interval, in seconds
   * Support for 900 second (15 minute) intervals is required
   * Support for other typical intervals (e.g., 300, 3600) is optional

## Response Properties and General Notes

* `time` represents the start of the interval, such the `value` should represent the energy consumed between `time` and `time + duration`
* `value` has units of watt-hours (Wh) and is signed:
   * For charge values, positive (>0)
   * For discharge values, negative (<0)
* Intervals must be \"clock-aligned\" to 15-minute windows, eg 00:00:00, 00:15:00, 00:30:00, etc. See the examples below.
* Data must be available consecutively, and it must only become available after any previous gaps have been filled in where appropriate. The VPP interprets gaps in the data as zero energy, which is appropriate for devices that are frequently \"off\", such as EV chargers and thermostats.
   * Otherwise, the VPP could not distinguish a temporary delay from a true lack of device activity.
* For EV chargers and other devices that are \"off\", values of zero (0) should be present if they are part of a charging session, but do not need to be present for intervals outside of sessions (the VPP will infer the absence of data as non-charging time once the next explicit interval appears chronologically).
* Zero (0) can also be used when the energy data is unavailable and not expected to become available later.
* The VPP will typically poll this endpoint once per day per device, with a start time of the last recorded interval for the device. This picks up data that was delayed temporarily due to issues such as device connectivity.

### Examples
* The VPP requests: start time: 13:05. end time: 13:15
   * The response should include all energy consumption between 13:00 and 13:15, not just the energy consumed in the specified 10 minutes.
* The VPP requests: start time: 12:00, end time: 15:13
    * The response should include data points for all complete 15-minute intervals, which is the intervals from 12:00 to 15:00. The data between 15:00 and 15:13 will be retrieved in the next query after the 15:00-15:15 interval is available.

# FAQ
### How far in advance can commands be scheduled? How long can commands last?
Commands are sent in the 60 seconds before the start time and will not exceed a 24 hour duration. Commands with a start time in the past should still be considered valid so long as the current time is within the duration.

### What is the difference between device registration, subscription, and enrollment?
An \"enrolled\" device has been approved to participate in a VPP program. Subscription refers to whether the VPP is choosing to receive data for that device. When modifying the subscription of a device, the VPP can choose to `register` or `unregister` the device. 

### How does the device partner know which `PROGRAM_PUBLISH_KEY` and `PROGRAM_PUBLISH_SECRET` to use when publishing data?
The VPP will provide a unique `PROGRAM_PUBLISH_KEY` and `PROGRAM_PUBLISH_SECRET` for new programs. The Device Partner should associate new devices with the program so that it can use the correct program credentials.

### How frequently should device data be published to the VPP?
Telemetry data in the lists of \"signals\" and \"settings\" should be published between every 5 and every 15 minutes. This data should contain 5 minute intervals for continuous signals. Categorical signals and settings that change infrequently can be updated only on change.

### My device publishes data that doesn't correspond to an existing signal or setting. What should I do with it?
The signal and setting lists are constantly evolving. Please contact the Gravity Connect team with suggestions for updating the specification.

### How should a Device Partner handle errors when publishing data to the VPP's endpoints?
Please see the [Error Handling section in the VPP API documentation](/vpp-api#section/Error-Handling).

### What's the difference between the command status and the device command status?
Device command status is for a specific device. Command status is used for groups of devices.
 
For individual device commands, use only the device command status endpoint.

For group commands, the command status reflects the state of the command at a scheduling engine level. For example, `OPT_OUT` would not apply and a status of `FAILED` means there was an issue scheduling the command as a whole. If a particular device's status does not reflect the greater command status (e.g., an individual device fails or opts out), report that difference via the device command status. Device command status that is the same as the current command status does not need to be reported.

### Does `/subscription` control Command Status and Device Command Status publishing to the VPP?
No, this endpoint only controls the sending of signals and settings. In the case that an unsubscribed device is targeted by a command (which is not an expected situation), the response data should not be reported to the VPP.
