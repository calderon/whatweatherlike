require('dotenv').config()

// eslint-disable-next-line no-undef
const { PORT, OPENWEATHER_TOKEN } = process.env

module.exports = {
  PORT,
  OPENWEATHER_TOKEN,
}
