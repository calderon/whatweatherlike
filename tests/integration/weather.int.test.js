const request = require('supertest')
const app = require('../../app')

const endPointUrl = '/weather'

describe(endPointUrl, () => {
  it(`GET ${endPointUrl}`, async () => {
    const response = await request(app).get(endPointUrl)

    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
    expect(response.statusCode).toBe(200)
  })
})
