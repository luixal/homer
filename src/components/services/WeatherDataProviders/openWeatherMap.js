// should return:
// {
    // icon: {
    //     url: '',
    //     alt: ''
    // },
//     description: '',
//     temperature: 2.0,
//     humidity: 80,
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

function transformWeatherData(data) {
    let result = {
        icon: {
            url: `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
            alt: `${data.current.weather[0].main} icon`
        },
        description: data.current.weather[0].description,
        temperature: data.current.temp,
        humidity: data.current.humidity
    };
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

export async function getCurrentWeather(config) {
    const URL = 'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,daily&';
    let weather = await fetch(URL + new URLSearchParams(config))
        .then((res) => res.json())
        .catch((err) => console.log(err));
    if (weather.cod && weather.cod != 200) return null;
    return transformWeatherData(weather);
}