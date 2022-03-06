const httpMocks = require('node-mocks-http')

const openWeatherService = require('../../services/openweather.js')
const weatherController = require('../../controllers/weather.controller.js')
const PlaceModel = require('../../models/place.js')
const ForecastModel = require('../../models/forecast.js')

const openWeatherPayload = require('../mocks/openweather.json')

openWeatherService.get = jest.fn()

let req, res, next
beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('weatherController.getWeather', () => {
  describe('place has not been previously saved', () => {
    it('should be saved', async () => {
      openWeatherService.get.mockReturnValue(openWeatherPayload)
      req.query.q = openWeatherPayload.name

      let record = await PlaceModel.findOne({ name: openWeatherPayload.name })
      let count = await PlaceModel.count()
      expect(record).toBeNull()
      expect(count).toEqual(0)
      await weatherController.getWeather(req, res, next)
      record = await PlaceModel.findOne({ name: openWeatherPayload.name })
      expect(record.name).toBe(openWeatherPayload.name)
      count = await PlaceModel.count()
      expect(count).toEqual(1)
    })
  })

  describe('place has been previously saved', () => {
    let place

    beforeAll(async () => {
      place = new PlaceModel({
        name: openWeatherPayload.name,
        lat: openWeatherPayload.coord.lat,
        lon: openWeatherPayload.coord.lon,
        timezone: openWeatherPayload.timezone,
      })

      await place.save()
    })

    it('should not be saved again', async () => {
      openWeatherService.get.mockReturnValue(openWeatherPayload)
      req.query.q = openWeatherPayload.name

      let count = await PlaceModel.count()
      expect(count).toEqual(1)

      let record = await PlaceModel.findOne({
        name: openWeatherPayload.name
      })
      expect(record).not.toBeNull()
      expect(record.name).toBe(openWeatherPayload.name)

      await weatherController.getWeather(req, res, next)

      count = await PlaceModel.count()
      expect(count).toEqual(1)
    })
  })

  describe('weather', () => {
    it('should be saved', async () => {
      openWeatherService.get.mockReturnValue(openWeatherPayload)
      req.query.q = openWeatherPayload.name

      let count = await ForecastModel.count()
      expect(count).toEqual(0)

      await weatherController.getWeather(req, res, next)

      count = await ForecastModel.count()
      expect(count).toEqual(1)
    })
  })
})
