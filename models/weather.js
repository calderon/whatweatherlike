const mongoose = require('mongoose')

const WeatherSchema = new mongoose.Schema({
  temp: {
    type: Number,
    required: true
  },
  tempFeelsLike: {
    type: Number,
    required: true,
  },
  tempMin: {
    type: Number,
    required: true,
  },
  tempMax: {
    type: Number,
    required: true,
  },
  pressure: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  visibility: {
    type: Number,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  windDeg: {
    type: Number,
    required: true,
  },
  cloudiness: {
    type: Number,
    required: true,
  },
  calculatedAt: {
    type: Date,
    required: true,
  },
  sunriseAt: {
    type: Date,
    required: true,
  },
  sunsetAt: {
    type: Date,
    required: true,
  },
  timezone: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
})

WeatherSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const WeatherModel = mongoose.model('Weather', WeatherSchema)

module.exports = WeatherModel
