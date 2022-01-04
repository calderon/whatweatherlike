const weatherService = require('../services/weather_api.js')

exports.getWeather = async (req, res, next) => {
  try {
    const weather = await weatherService.get()

    res.status(200).json(weather)
  } catch (err) {
    next(err)
  }
}
