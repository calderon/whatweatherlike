const express = require('express')
const app = express()

const weatherRoutes = require('./routes/weather.routes.js')

app.use(express.json())

app.use('/weather', weatherRoutes)

app.get('/', (req, res) => {
  res.json({})
})

module.exports = app
