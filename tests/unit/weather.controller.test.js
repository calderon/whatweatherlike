const httpMocks = require('node-mocks-http')

const weatherService = require('../../services/weather_api.js')
const weatherController = require('../../controllers/weather.controller.js')
const Place = require('../../models/place.js')

const weatherPayload = require('../mocks/weather.json')

weatherService.get = jest.fn()

let req, res, next
beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('weatherController.getWeather', () => {
  describe('place is not in our database', () => {
    it('should be saved', async () => {
      const getPlace = async (name) => {
        return Place.findOne({ name })
      }

      weatherService.get.mockReturnValue(weatherPayload)
      const name = 'Madrid'
      req.query.q = name

      let record = await getPlace(name)
      expect(record).toBeNull()
      await weatherController.getWeather(req, res, next)
      record = await getPlace(name)
      expect(record.name).toBe(name)
    })
  })
})
