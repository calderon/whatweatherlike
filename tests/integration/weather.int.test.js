const request = require('supertest')
const app = require('../../app')

const endPointUrl = '/api/weather'

describe(endPointUrl, () => {
  it(`GET ${endPointUrl} with no query fails`, async () => {
    const response = await request(app).get(endPointUrl)
    expect(response.statusCode).toBe(404)
    expect(response.type).toBe('application/json')
  })

  it(`GET ${endPointUrl} with query`, async () => {
    const response = await request(app).get(`${endPointUrl}?q=Sevilla`)

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
  })
})
