function transformWeatherBlockData(data) {
    // console.log(new Date(data.dt * 1000));
    let result = {
        dt: data.dt,
        icon: {
            url: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            alt: `${data.weather[0].main} icon`
        },
        description: data.weather[0].description,
        temperature: data.temp,
        humidity: data.humidity,
        pressure: data.pressure
    };
    return result;
}

// should return:
// {
    // dt: 1610740800
    // icon: {
    //     url: '',
    //     alt: ''
    // },
//     description: '',
//     temperature: 2.0,
//     humidity: 80,
//     pressure: 1028,
//     alerts: [
//         {
//             sender: '',
//             event: '',
//             description: '',
//             start: 1610740800,
//             end: 1610787599
//         },
//         {
//             sender: '',
//             event: '',
//             description: '',
//             start: 1610740800,
//             end: 1610787599
//         }
//     ]
// }
function transformCurrentWeatherData(data) {
    let result = transformWeatherBlockData(data.current);
    if (data.alerts && data.alerts.length) result.alerts = data.alerts.map(
        (alert) => {
            return {
                sender: alert.sender_name,
                event: alert.event,
                description: alert.description,
                start: alert.start,
                end: alert.end
            }
        }
    ).sort(
        (alertA, alertB) => {
            return alertA.start - alertB.start;
        }
    );
    return result;
}

async function fetchWeather(config) {
    const URL = 'https://api.openweathermap.org/data/2.5/onecall?';
    let weather = await fetch(URL + new URLSearchParams(config))
        .then((res) => res.json())
        .catch((err) => console.log(err));
    if (weather.cod && weather.cod != 200) return null;
    return weather;
}

export async function getCurrentWeather(config) {
    config.exclude = 'minutely,hourly,daily';
    let weather = await fetchWeather(config);
    return transformCurrentWeatherData(weather);
}

export async function getHourlyWeather(config) {
    // how many hours?
    config.exclude = 'minutely,daily';
    let weather = await fetchWeather(config);
    // weather.hourly.splice(0, 8).map( hour => console.log(new Date(hour.dt * 1000)) );
    // return weather.hourly.splice(0, config.hoursCount || 5).map( transformWeatherBlockData );
    return {
        hourly: weather.hourly.splice(0, config.hoursCount || 5).map( transformWeatherBlockData ),
        alerts: weather.alerts
    }
    // return transformCurrentWeatherData(weather);
}