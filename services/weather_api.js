const axios = require('axios')

const config = require('../utils/config.js')

const baseURL = 'https://api.openweathermap.org/data/2.5/weather'

const baseParams = {
  appid: config.OPENWEATHER_TOKEN,
  units: 'metric',
  lang: 'es',
}

const instance = axios.create({
  baseURL,
  params: baseParams,
})

const get = async (place) => {
  try {
    const response = await instance.get('', {
      params: {
        q: place,
      },
    })

    return response.data
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { get }
