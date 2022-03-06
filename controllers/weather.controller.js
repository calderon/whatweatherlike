const moment = require('moment')

const weatherService = require('../services/weather_api.js')
const PlaceModel = require('../models/place.js')
const WeatherModel = require('../models/weather.js')

exports.getWeather = async (req, res, next) => {
  try {
    let { q: queryPlace } = req.query
    const weatherQuery = await weatherService.get(queryPlace)

    let place = await PlaceModel.findOne({ name: queryPlace })
    if (place === null) {
      place = new PlaceModel({
        name: weatherQuery.name,
        lat: weatherQuery.coord.lon,
        lon: weatherQuery.coord.lat,
        timezone: weatherQuery.timezone,
      })

      await place.save()
    }

    let weather = new WeatherModel({
      temp: weatherQuery.main.temp,
      tempFeelsLike: weatherQuery.main.feels_like,
      tempMin: weatherQuery.main.temp_min,
      tempMax: weatherQuery.main.temp_max,
      pressure: weatherQuery.main.pressure,
      humidity: weatherQuery.main.humidity,
      visibility: weatherQuery.visibility,
      windSpeed: weatherQuery.wind.speed,
      windDeg: weatherQuery.wind.deg,
      cloudiness: weatherQuery.clouds.all,
      calculatedAt: moment.unix(weatherQuery.dt).utc().format(),
      sunriseAt: moment.unix(weatherQuery.sys.sunrise).utc().format(),
      sunsetAt: moment.unix(weatherQuery.sys.sunset).utc().format(),
      timezone: weatherQuery.timezone
    })

    weather = await weather.save()

    res.status(200).json(weather)
  } catch (err) {
    next(err)
  }
}
