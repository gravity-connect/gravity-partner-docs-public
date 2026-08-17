---
title: Quick Start Guide
sidebar_position: 3
---

## Endpoint Architecture
This guide describes the Device Partner endpoints and API endpoints hosted by the VPP for receiving data from the Device Partner's devices. The endpoints support standard integration operations, including publishing device signals, command statuses, and device enrollment events. Used together, they allow a two-way flow of information that enables utilities to control and manage devices.

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