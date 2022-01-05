const httpMocks = require('node-mocks-http')

const weatherController = require('../../controllers/weather.controller')
const weatherService = require('../../services/weather_api.js')

weatherService.get = jest.fn()

let req, res, next
beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('Weather Controller.getWeather', () => {
  it('should have a getWeather method', () => {
    expect(typeof weatherController.getWeather).toBe('function')
  })

  it('should call weatherService.get', async () => {
    await weatherController.getWeather(req, res, next)
    expect(weatherService.get).toHaveBeenCalled()
  })

  it('should return json body and response code 200', async () => {
    weatherService.get.mockReturnValue({})
    await weatherController.getWeather(req, res, next)

    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._isJSON()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual({})
  })

  it('should handle errors', async () => {
    const errorMessage = {
      message: 'Error',
    }
    const rejectedPromise = Promise.reject(errorMessage)
    weatherService.get.mockReturnValue(rejectedPromise)
    await weatherController.getWeather(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})
