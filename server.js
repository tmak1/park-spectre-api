const express = require('express')
const app = express()

const cors = require('cors')

const infoController = require('./controllers/infoController')
const sensorController = require('./controllers/sensorController')
const infoSensorController = require('./controllers/infoSensorController')

const port = 4567

app.use(cors())
app.use(infoController)
app.use(sensorController)
app.use(infoSensorController)
app.listen(port, () => console.log(`listening on port: ${port}`))