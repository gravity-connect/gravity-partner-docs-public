---
title: Device Type Specifications
sidebar_position: 5
---

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

 For information on how to authenticate when publishing data to the VPP, please see the [Authentication section](./vp-api.html#section/Authentication) for those endpoints.