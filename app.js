const express = require('express')
const cors = require('cors')
const app = express()

const weatherRoutes = require('./routes/weather.routes.js')

app.use(cors())
app.use(express.json())

app.use('/api/weather', weatherRoutes)

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
  })
})

app.get('/', (req, res) => {
  res.json({})
})

module.exports = app
