const express = require('express')
const router = express.Router()

const Axios = require('../lib/axios')
const Sensor = require('../models/sensor')

router.get('/api/sensors', (req, res) => {
    Axios.sensors().then(apiresults => res.json(apiresults.data))
})

router.get('/db/sensors', (req, res) => Sensor.all().then(sqlresults => res.json(sqlresults.rows)))

router.get('/populateDB/sensors', (req, res) => {
    Axios.sensors()
        .then(apiresults => {        
            apiresults.data.forEach(result => { 
                Sensor.create(result).then(sqlresults => { 
                    console.log(sqlresults.rows[0].bay_id);
                })
            });
            res.json(apiresults.data.length + ' row(s) entered');
        })
})

module.exports = router