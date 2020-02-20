const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const SSEChannel = require('sse-pubsub')
const port = 4567
const pg = require('pg');
const pool = new pg.Pool({ database: 'parkdev1', password: '1234' }); // connect to the database
const bodyParser = require('body-parser');

app.use(cors())

const channel = new SSEChannel();

var data = "Hello everyone";

// Say hello every second
// setInterval(() => channel.publish( data, 'myEvent'), 5000);

// app.get('/stream', (req, res) => channel.subscribe(req, res));

// client side code :
// const es = new EventSource("http://localhost:4567/sensors");
// es.addEventListener('myEvent', ev => {
// 	console.log(ev.data);
// });


app.get('/stream', (req, res) => {
    setInterval(() => {
        axios({ 
            url: "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json", 
            method: 'get', 
            params: { 
                "$limit" : 500000,
                "$$app_token" : "EVwS20Pb4HCatJGD3xccSiwbj" 
            }
        }).then(results => {
            // console.log(results.data);
            // res.json(results.data)
            channel.publish( results.data, 'myEvent')
        })
    }, 5000)
    channel.subscribe(req, res);
// count 2099
})

app.get('/sensors', (req, res) => {
    
    axios({ 
        url: "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json", 
        method: 'get', 
        params: { 
            "$limit" : 500000,
            "$$app_token" : "EVwS20Pb4HCatJGD3xccSiwbj" 
        }
    }).then(results => {
        // console.log(results.data);
        res.json(results.data)
    })
// count 2099
})

app.get('/bays', (req, res) => {
    axios({ 
        url: "https://data.melbourne.vic.gov.au/resource/wuf8-susg.json", 
        method: 'get', 
        params: { 
            "$limit" : 2000,
            "$$app_token" : "EVwS20Pb4HCatJGD3xccSiwbj" 
        }
    }).then(results => {
        // console.log(results.data);
        res.json(results.data)
    })
// count ...
})

app.get('/info', (req, res) => {
    axios({ 
        url: "https://data.melbourne.vic.gov.au/resource/ntht-5rk7.json", 
        method: 'get', 
        params: { 
            "$limit" : 500000,
            "$$app_token" : "EVwS20Pb4HCatJGD3xccSiwbj" 
        }
    }).then(results => {
        // console.log(results.data);
        res.json(results.data);
    })
// count 4589 rows
})

app.get('/logtodb/sensors', (req, res) => {
    axios({ 
        url: "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json", 
        method: 'get', 
        params: {
            "$limit": 500000, 
            "$order": "bay_id, st_marker_id",
            "$$app_token": "EVwS20Pb4HCatJGD3xccSiwbj" 
        }
    }).then(results => {        
        results.data.forEach(result => { 
            sql = `INSERT INTO bay_sensors (bay_id, st_marker_id, status, lat, lon) VALUES ($1, $2, $3, $4, $5) RETURNING *;` // the RETURNING syntax shows the row that was inserted or deleted 
            pool.query(sql, [
                result.bay_id,
                result.st_marker_id,
                result.status,
                result.lat,
                result.lon
            ])
            .then(resultds => { 
                //res.json({ data: resultds.rows })
                // console.log(result.bay_id);
            })
        });
        // console.log(results.data.length);
        
    })

})

app.get('/logtodb/bays', (req, res) => {
    axios({ 
        url: "https://data.melbourne.vic.gov.au/resource/wuf8-susg.json", 
        method: 'get', 
        params: {
            "$limit": 5000, 
            "$order": "bay_id, marker_id",
            "$$app_token": "EVwS20Pb4HCatJGD3xccSiwbj" 
        }
    }).then(results => {        
        results.data.forEach(result => { 
            sql = `INSERT INTO bays (bay_id, marker_id, meter_id, rd_seg_id, rd_seg_dsc, type, lat, lon)`
            sql+= `VALUES ($1, $2, $3, $4, $5, $6, $7, $8);` 
            pool.query(sql, [
                result.bay_id,
                result.marker_id,
                result.meter_id,
                result.rd_seg_id,
                result.rd_seg_dsc,
                result.the_geom.type,
                result.the_geom.coordinates[0][0][0][1],
                result.the_geom.coordinates[0][0][0][0]
            ])
            .then(resultds => { 
                //res.json({ data: resultds.rows })
                // console.log(result.bay_id);
            })
        });
        // console.log(results.data.length);
        
    })

})

app.get('/logtodb/info', (req, res) => {
    axios({ 
        url: "https://data.melbourne.vic.gov.au/resource/ntht-5rk7.json", 
        method: 'get', 
        params: {
            "$limit": 500000, 
            "$order": "bayid",
            "$$app_token": "EVwS20Pb4HCatJGD3xccSiwbj" 
        }
    }).then(results => {        
        results.data.forEach(result => { 
            sql = `INSERT INTO bay_restrictions (bayid, deviceid,`
            sql += ` description1, description2, description3, description4, description5, description6,`
            sql += ` typedesc1, typedesc2, typedesc3, typedesc4, typedesc5, typedesc6)`
            sql+= ` VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);` 
            pool.query(sql, [
                result.bayid,
                result.deviceid,
                result.description1,
                result.description2,
                result.description3,
                result.description4,
                result.description5,
                result.description6,
                result.typedesc1,
                result.typedesc2,
                result.typedesc3,
                result.typedesc4,
                result.typedesc5,
                result.typedesc6
            ])
            .then(resultds => { 
                //res.json({ data: resultds.rows })
                // console.log(result.bayid);
            })
        });
        // console.log(results.data.length);
        
    })

})




app.listen(port, () => console.log(`running on ${port}`))


// The way the datasets join is as follows. 
//The on-street parking bay sensors join to the on-street parking bays by the marker_id attribute. 
//The on-street parking bay sensors join to the on-street car park bay information by the bay_id attribute. 
//The on-street parking bays and the on-street car park bay information don’t currently join.


// On-street Parking Bay Sensors: the current status of each sensor.
// On-street Car Park Bay Information: restrictions that apply to 
//each bay with a sensor, at various times of the week. 
// On-street Parking Bays: the location and shape of every bay, 
//including the nearly 20,000 without sensors. 

// count sensor rows 2099
// count info rows 4589
// count sensor - info 2150




app.get('/usemap', (req, res) => {
    sql = `SELECT * FROM bay_restrictions r, bay_sensors s WHERE s.bay_id = r.bayid ORDER BY s.bay_id;`
    pool.query(sql, []).then(results => { 
        res.json(results.rows);
        // mainMap(results.rows);
    })

})


var mainMap = (results) => {
    // var results = [
    //     {name: "Melbourne Cricket Grounds", location: {lat: -37.819967, long: 144.983449}},
    //     {name: "Flagstaff Gardens", location: {lat: -37.810680, long: 144.954352}},
    //     {name: "Emporium Melbourne", location: {lat: -37.812433, long: 144.963787}},
    //     {name: "City Library", location: {lat: -37.817039, long: 144.965983}},
    //     {name: "Southern Cross Station", location: {lat: -37.818281, long: 144.952776}},
    //     {name: "Sea Life Melbourne Aquarium", location: {lat: -37.820640, long: 144.958325}}
    //   ]
    var creatInfoBox = map => {
        //Create an infobox at the center of the map but don't show it.
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });
    
        //Assign the infobox to a map instance.
        infobox.setMap(map);
    }
    
    
    var addPin = (map, result, index) => {
        //Create custom Pushpin
        var pin = new Microsoft.Maps.Pushpin(
            { latitude: result.lat, longitude: result.lon  },
            {
                title: result.description1,
                subTitle: '',
                text: index
            });
    
            // var pushpinClicked = 
            pin.metadata = {
                title: result.description1,
                description: `${result.lat} ${result.lon}`
            };
    
            Microsoft.Maps.Events.addHandler(pin, 'mouseover', function (e) {
                e.target.setOptions({ 
                    subTitle: 'Melbourne',
                });
            });
        
            Microsoft.Maps.Events.addHandler(pin, 'mouseout', function (e) {
                e.target.setOptions({ 
                    subTitle: '',
                });
            });
            
            Microsoft.Maps.Events.addHandler(pin, 'click', (e) => {
                //Make sure the infobox has metadata to display.
                console.log(e.target.metadata);
                if (e.target.metadata) {
                    //Set the infobox options with the metadata of the pushpin.
                    infobox.setOptions({
                        location: e.target.getLocation(),
                        title: e.target.metadata.title,
                        description: e.target.metadata.description,
                        visible: true
                    });        
                    
                }
            });
    
            //Add the pushpin to the map
            map.entities.push(pin);
            
    }

}

// function GetMap() {
//     var map = new Microsoft.Maps.Map('#map', {
//         center: new Microsoft.Maps.Location(-37.818555, 144.959076),
//         zoom: 17
//     });

//     creatInfoBox(map);
//     results.forEach((result, index) => {
//         addPin(map, result, index);
//     });
    
// } 