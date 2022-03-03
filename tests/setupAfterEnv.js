require('dotenv').config()

const database = require('./config/database.js')

beforeAll(async () => {
  await database.connect()
})

afterEach(async () => {
  await database.clear()
})

afterAll(async () => {
  await database.close()
})
