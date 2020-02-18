const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 8080

app.use(cors())

app.get('/api/parkingbays', (req, res) => {
    axios.get("https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json", {
        params: {
            "$limit" : 5000,
            "$$app_token" : "EVwS20Pb4HCatJGD3xccSiwbj"
          }
    }).then(results => {
        res.json(results.data)


    })

})


app.listen(port, () => console.log(`running on ${port}`))
