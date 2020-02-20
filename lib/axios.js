const axios = require('axios')

function info() {
    return axios({ 
        url: "https://data.melbourne.vic.gov.au/resource/ntht-5rk7.json", 
        method: 'get', 
        params: {
            "$limit": 500000, 
            "$order": "bayid",
            "$$app_token": "EVwS20Pb4HCatJGD3xccSiwbj" 
        }
    })
}

function sensors() {
    return axios({ 
        url: "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json",
        method: 'get',
        params: {
            "$limit": 500000,
            "$order": "bay_id, st_marker_id",
            "$$app_token": "EVwS20Pb4HCatJGD3xccSiwbj"
        }
    })
}
  
module.exports = { info, sensors }