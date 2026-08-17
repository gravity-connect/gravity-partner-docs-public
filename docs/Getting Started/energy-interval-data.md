---
title: Energy Interval Data
sidebar_position: 4
---

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
