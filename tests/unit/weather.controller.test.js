const httpMocks = require('node-mocks-http')

const weatherService = require('../../services/weather_api.js')
const weatherController = require('../../controllers/weather.controller.js')
const Place = require('../../models/place.js')
const Weather = require('../../models/weather.js')

const weatherPayload = require('../mocks/openweather-api.json')

weatherService.get = jest.fn()

let req, res, next
beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('weatherController.getWeather', () => {
  describe('place has not been previously saved', () => {
    it('should be saved', async () => {
      weatherService.get.mockReturnValue(weatherPayload)
      req.query.q = weatherPayload.name

      let record = await Place.findOne({ name: weatherPayload.name })
      let count = await Place.count()
      expect(record).toBeNull()
      expect(count).toEqual(0)
      await weatherController.getWeather(req, res, next)
      record = await Place.findOne({ name: weatherPayload.name })
      expect(record.name).toBe(weatherPayload.name)
      count = await Place.count()
      expect(count).toEqual(1)
    })
  })

  describe('place has been previously saved', () => {
    let place

    beforeAll(async () => {
      place = new Place({
        name: weatherPayload.name,
        lat: weatherPayload.coord.lat,
        lon: weatherPayload.coord.lon,
        timezone: weatherPayload.timezone,
      })

      await place.save()
    })

    it('should not be saved again', async () => {
      weatherService.get.mockReturnValue(weatherPayload)
      req.query.q = weatherPayload.name

      let count = await Place.count()
      expect(count).toEqual(1)

      let record = await Place.findOne({ name: weatherPayload.name })
      expect(record).not.toBeNull()
      expect(record.name).toBe(weatherPayload.name)

      await weatherController.getWeather(req, res, next)

      count = await Place.count()
      expect(count).toEqual(1)
    })
  })

  describe('weather', () => {
    it('should be saved', async () => {
      weatherService.get.mockReturnValue(weatherPayload)
      req.query.q = weatherPayload.name

      let count = await Weather.count()
      expect(count).toEqual(0)

      await weatherController.getWeather(req, res, next)

      count = await Weather.count()
      expect(count).toEqual(1)
    })
  })
})
