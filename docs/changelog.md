---
title: Changelog
sidebar_position: 2
---

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
