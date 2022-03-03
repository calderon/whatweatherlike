const config = require('./utils/config')
const app = require('./app')
const database = require('./utils/database')
database.connect()

app.listen(config.PORT, () => {
  console.log(`Example app listening at http://localhost:${config.PORT}`)
})
