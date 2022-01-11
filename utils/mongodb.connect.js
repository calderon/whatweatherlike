const mongoose = require('mongoose')
const config = require('./config')

const connect = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
  } catch (error) {
    console.error('Error connecting to database')
    console.error(error)
  }
}

module.exports = { connect }
