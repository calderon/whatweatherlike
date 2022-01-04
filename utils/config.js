require('dotenv').config()

// eslint-disable-next-line no-undef
const { PORT, OPENWEATHER_KEY } = process.env

module.exports = {
  PORT,
  OPENWEATHER_KEY,
}
