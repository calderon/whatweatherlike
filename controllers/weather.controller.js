const weatherService = require('../services/weather_api.js')

exports.getWeather = async (req, res, next) => {
  if (!req.query.q) {
    res.status(400).json({
      message: 'q query param is needed',
    })
  }

  try {
    const weather = await weatherService.get(req.query.q)

    res.status(200).json(weather)
  } catch (err) {
    next(err)
  }
}
