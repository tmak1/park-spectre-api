const express = require('express')
const router = express.Router()

const Axios = require('../lib/axios')
const Info = require('../models/info')

router.get('/api/info', (req, res) => {
    Axios.info().then(apiresults => res.json(apiresults.data))
})

router.get('/db/info', (req, res) => Info.all().then(sqlresults => res.json(sqlresults.rows)))

router.get('/populateDB/info', (req, res) => {
    Axios.info()
        .then(apiresults => {        
            apiresults.data.forEach(result => { 
                Info.create(result).then(sqlresults => { 
                    console.log(sqlresults.rows[0].bayid);
                })
            });
            res.json(apiresults.data.length + ' row(s) entered');
        })
})

module.exports = router