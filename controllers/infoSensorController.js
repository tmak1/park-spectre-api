const express = require('express')
const router = express.Router()
const SSEChannel = require('sse-pubsub')
const channel = new SSEChannel();

const Axios = require('../lib/axios')
const Sensor = require('../models/sensor')
const InfoSensor = require('../models/infoSensor')


setInterval(() => {
    Axios.sensors()
    .then(apiresults => {
        Sensor.destroy()
        .then(() => { 
            const receipts = []; 
            apiresults.data.forEach(result => receipts.push(Sensor.create(result)));
            Promise.all(receipts).then(() => {
                InfoSensor.all().then(sqlresults => channel.publish( sqlresults.rows, 'broadcast'))  
            })              
        })       
    })
}, 40000)

router.get('/', (req, res) => {
    InfoSensor.all().then(sqlresults => res.json(sqlresults.rows))
})

router.get('/broadcast', (req, res) => {
    // console.log('connected');
    channel.subscribe(req, res);
})

module.exports = router