const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

const connect = async () => {
  // console.log('>>> DATABASE: Connect')
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), {})
  // console.log('>>> DATABASE: Connected')
}

const close = async () => {
  if (mongoServer) {
    // console.log('>>> DATABASE: Closing')
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
    // console.log('>>> DATABASE: Closed')
  }
}

const clear = async () => {
  if (mongoServer) {
    // console.log('>>> DATABASE: Clearing')

    const collections = mongoose.connection.collections

    for (const key in collections) {
      await collections[key].deleteMany({})
    }

    // console.log('>>> DATABASE: Clear')
  }
}

module.exports = { connect, close, clear }
