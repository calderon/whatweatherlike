const weatherService = require('../services/weather_api.js')

const getWeather = async (req, res, next) => {
  try {
    const weather = await weatherService.get()

    res.status(200).json(weather)
  } catch (err) {
    next(err)
  }
}

module.exports = { getWeather }
