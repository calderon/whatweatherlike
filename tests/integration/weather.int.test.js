const nock = require('nock')
const request = require('supertest')
const app = require('../../app.js')

const config = require('../../utils/config.js')

const endPointUrl = '/api/weather'

const baseParams = {
  appid: config.OPENWEATHER_TOKEN,
  units: 'metric',
  lang: 'es',
}

const weatherPayload = require('../mocks/weather.json')

describe(endPointUrl, () => {
  it(`GET ${endPointUrl} with no query fails`, async () => {
    nock('https://api.openweathermap.org/data/2.5').get('/weather').reply(404)

    const response = await request(app).get(endPointUrl)

    expect(response.statusCode).toBe(404)
    expect(response.type).toBe('application/json')
  })

  it(`GET ${endPointUrl} with query`, async () => {
    const params = new URLSearchParams(Object.assign({}, baseParams))

    params.append('q', 'Madrid')

    nock('https://api.openweathermap.org/data/2.5')
      .get('/weather')
      .query(params)
      .reply(200, weatherPayload)

    const response = await request(app).get(`${endPointUrl}?q=Madrid&appi`)

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
    expect(response.body).toEqual(weatherPayload)
  })
})
