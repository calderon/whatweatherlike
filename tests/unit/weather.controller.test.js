const httpMocks = require('node-mocks-http')

const weatherController = require('../../controllers/weather.controller')

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

  it('should return json body and response code 200', async () => {
    await weatherController.getWeather(req, res, next)

    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual({})
  })
})
