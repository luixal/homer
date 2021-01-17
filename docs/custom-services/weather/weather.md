# Weather Custom Services

## Introduction

As you would see by reading this page, weather services are splitted in two different parts: service and data provider.

The `service` is the equivalent ot the frontend, the visible part, while the `provider` is the source of data the `services` gathers weather data from. You can mix them as you want, this is: any service can be used with any data provider. Also, you can have the same service several times, showing data from different provider. Or a combination, as you wish.

## Table of Contents

- [Services](#services)
    - [Current Weather](#current-weather)
    - [Day Weather](#day-weather)
    - [Week Weather](#week-weather)
- [Data Providers](#data-providers)
    - [OpenWeatherMap](#openweathermap)

## Services

These are the custom services able to show the weather. Each one shows different information: current weather, next hours weather and next days weather.

Below you can find some screenshots and how to set your config file. **You also need to choose and configure a [data provider](#data-providers)**

### Current Weather
Shows current weather at a defined location.

![Current Weather Card][weather-current]

When the alert icon is clicked, it shows alert's content:

![Weather Alerts][weather-alerts]

In your config file you only need to add a new `item` in `services` similar to the one below. Field `type` is mandatory and has to be set to `WeatherCurrent`.

```yaml
services:
  - name: "Weather"
    icon: "fas fa-cloud"
    items:
      - name: "Madrid"
        type: "WeatherCurrent"
        alertsTitle: "Alertas Climatológicas"
        provider:
          ...
```
Not all these fields are mandatory, you have list here:

| Field | Description | Mandatory | Default value |
| ----- | ----------- | --------- | ------------- |
| `name` | Location's name | No |  |
| `type` | Services type | Yes |  |
| `alertsTitle` | Title to show in the alerts modal | No | `Alerts` |


### Day Weather
### Week Weather

## Data Providers

These are the weather data providers supported at the moment. You can choose a provider by setting its configuration along with the service data in your config file.

### OpenWeatherMap

This provider fetches data from [OpenWeatherMap](openweathermap-home) service.

For configuring this data provider you need to follow this prior steps:

1. Create an account in the [OpenWeatherMap web page](openweathermap-sign-up).
2. Once into you account, click on your user (top right corner) and go to [My API Keys](openweathermap-api-keys).
3. You can create a new API Key here. Maybe a default one is already generated, you can use that one.
4. Copy the generated `Key`, you would need that in the configuration.

In your config file, you need to setup this API Key within more information, like this:

```yaml
services:
  - name: "Weather"
    icon: "fas fa-cloud"
    items:
      - name: "Madrid"
        type: "WeatherCurrent"
        alertsTitle: "Alertas Climatológicas"
        provider:
          name: openWeatherMap
          params:
            appid: "902aaaaaaaa56faaaaacba5e1229fba7"
            units: "metric"
            lang: "es"
            lat: 40.4381311
            lon: -3.8196196
```
As you can see, `provider` configuration contains two main fields, `name` and `params`. The `name` field is for selecting the data provider and `params` are the config parameters that provider needs. In this case, these are the fields:

| Field | Description | Mandatory | Default value |
| ----- | ----------- | --------- | ------------- |
| `appid` | API Key generated above | Yes |  |
| `units` | Units used to show weather values | No | `standard`* |
| `lang` | Language used | No | `us` |
| `lat` | Latitude coordinate | Yes | |
| `lon` | Longitude coordinate | Yes | |

*`Units` possible values: `standard`, `metric` and `imperial`.

[weather-current]: ./weather-current.png "Current Weather Card"
[weather-alerts]: ./weather-alerts.png "Weather Alerts Modal"
[openweathermap-home]: https://openweathermap.org/current
[openweathermap-sign-up]: https://home.openweathermap.org/users/sign_up
[openweathermap-api-keys]: https://home.openweathermap.org/api_keys