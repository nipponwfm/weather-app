const request = require('request');

const forecast = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2df16142df16ec67a675862b306b50a4&query=${location}`;

    request(url, (error, response) => {
        if (error) {
            callback("Unknown error...", undefined)
        }
        else {
            data = JSON.parse(response.body)
            if (data.success===undefined) {
                callback(undefined, {
                    location: data.location.name,
                    country: data.location.country,
                    temperature: data.current.temperature,
                    icon: data.current.weather_icons
                })
            }
            else {
                callback("Not found location", undefined)
            }
        }
    })
}

module.exports = forecast