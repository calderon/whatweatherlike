require('dotenv').config()

// eslint-disable-next-line no-undef
const { PORT, OPENWEATHER_TOKEN, MONGODB_URI } = process.env

module.exports = {
  PORT,
  OPENWEATHER_TOKEN,
  MONGODB_URI,
}
