const express = require('express')
const app = express()
const PORT = process.env.PORT || 4567
const cors = require('cors')

const infoController = require('./controllers/infoController')
const sensorController = require('./controllers/sensorController')
const infoSensorController = require('./controllers/infoSensorController')


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

app.use(cors())
app.use(infoController)
app.use(sensorController)
app.use(infoSensorController)
app.listen(PORT, () => console.log(`listening on port: ${ PORT }`))