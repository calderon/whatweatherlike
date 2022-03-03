const weatherService = require('../services/weather_api.js')
const Place = require('../models/place.js')

exports.getWeather = async (req, res, next) => {
  try {
    let { q: queryPlace } = req.query
    const weather = await weatherService.get(queryPlace)

    let place = await Place.findOne({ name: queryPlace })
    if (place === null) {
      place = new Place({
        name: weather.name,
        lat: weather.coord.lon,
        lon: weather.coord.lat,
        timezone: weather.timezone,
      })

      await place.save()
    }

    res.status(200).json(weather)
  } catch (err) {
    next(err)
  }
}
