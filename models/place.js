const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  timezone: {
    type: Number,
    required: true,
  },
})

PlaceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const PlaceModel = mongoose.model('Place', PlaceSchema)

module.exports = PlaceModel
