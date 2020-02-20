const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const SSEChannel = require('sse-pubsub')
const port = 4567
const pg = require('pg');
const pool = new pg.Pool({ database: 'parkdev1' }); // connect to the database
const bodyParser = require('body-parser');

app.use(cors())

const channel = new SSEChannel();

    setInterval(() => {
        getAllBays();
    }, (40000))

// SSE stream path
// app.get('/stream', (req, res) => {
//     setInterval(() => {
//         axios({ 
//             url: "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json", 
//             method: 'get', 
//             params: { 
//                 "$limit" : 500000,
//                 "$$app_token" : "EVwS20Pb4HCatJGD3xccSiwbj" 
//             }
//         }).then(results => {
//             // console.log(results.data);
//             // res.json(results.data)
//             channel.publish( results.data, 'myEvent')
//         })
//     }, 5000)
//     channel.subscribe(req, res);
// // count 2099
// })

var getAllBays = () => {
    console.log('sdfsdf')
    axios({ 
        url: "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json", 
        method: 'get', 
        params: { 
            "$limit" : 500000,
            "$$app_token" : "EVwS20Pb4HCatJGD3xccSiwbj" 
        }
    }).then(results => {
        sql = `DELETE FROM bay_sensors;`
        pool.query(sql, []).then(() => { 
            results.data.forEach(result => {
                receipts = []; 
                sql = `INSERT INTO bay_sensors (bay_id, st_marker_id, status, lat, lon) VALUES ($1, $2, $3, $4, $5) RETURNING *;` // the RETURNING syntax shows the row that was inserted or deleted 
                receipts.push(pool.query(sql, [
                    result.bay_id,
                    result.st_marker_id,
                    result.status,
                    result.lat,
                    result.lon
                ]))
                // .then(sqlresults => { 
                //     console.log(sqlresults.rows[0].bay_id);
                // })
            });
            Promise.all(receipts).then(() => {
                sql = `SELECT * FROM bay_restrictions r, bay_sensors s WHERE s.bay_id = r.bayid ORDER BY s.bay_id;`
                pool.query(sql, []).then(sqlresults => { 
                    // res.json(sqlresults.rows);
                    channel.publish( sqlresults.rows, 'myEvent')
                })  
            })              
        })       
    })
}

app.get('/stream', (req, res) => {
    console.log('connected');
    channel.subscribe(req, res);
// count 2099
})

app.get('/usemap', (req, res) => {
    sql = `SELECT * FROM bay_restrictions r, bay_sensors s WHERE s.bay_id = r.bayid ORDER BY s.bay_id;`
    pool.query(sql, []).then(sqlresults => { 
        res.json(sqlresults.rows);
    })
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
            .then(sqlresults => { 
                console.log(sqlresults.rows[0].bay_id);
            })
        });
        // console.log(results.data.length);
        res.json(results.data.length);
        
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
                res.json({ data: resultds.rows })
                console.log(result.bay_id);
            })
        });
        console.log(results.data.length);
        
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
            sql+= ` VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;` 
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
            ]).then(sqlresults => { 
                console.log(sqlresults.rows[0].bayid);
            })
        });
        // console.log(results.data.length);
        res.json(results.data.length);
        
    })

})

// app.get('/usemap', (req, res) => {
//     axios({ 
//         url: "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json", 
//         method: 'get', 
//         params: {
//             "$limit": 500000,
//             "$select": "bay_id, status", 
//             "$order": "bay_id",
//             "$$app_token": "EVwS20Pb4HCatJGD3xccSiwbj" 
//         }
//     }).then(results => {          
//         results.data.forEach(newBays => {

//             sql = `SELECT updated_at FROM bay_sensors WHERE bay_id = $1;`;
//             pool.query(sql, [newBays.bay_id]).then(times => { 
//                 last_updated = new Date(times.rows[0].updated_at + 'Z');
//                 currentTime = new Date();
//                 console.log('current: \n' + currentTime + '\nlast:\n' + last_updated);
//             })

//             // sql = `UPDATE bay_sensors SET status = $1 WHERE bay_id = $2;`;
//             // pool.query(sql, ["nothing!!", newBays.bay_id]).then(results => { 
//             //     //res.json(results.rows);     
//             // })

//         })
//         sql = `SELECT * FROM bay_restrictions r, bay_sensors s WHERE s.bay_id = r.bayid ORDER BY s.bay_id;`
//         pool.query(sql, []).then(sqlresults => { 
//             res.json(sqlresults.rows);
//             // mainMap(results.rows);
//         })
//     })
// })

// app.get('/usemap', (req, res) => {
//     axios({ 
//         url: "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json", 
//         method: 'get', 
//         params: {
//             "$limit": 500000,
//             "$select": "bay_id, status", 
//             "$order": "bay_id",
//             "$$app_token": "EVwS20Pb4HCatJGD3xccSiwbj" 
//         }
//     }).then(results => {          
//         results.data.forEach(newBays => {

//             sql = `SELECT updated_at FROM bay_sensors WHERE bay_id = $1;`;
//             pool.query(sql, [newBays.bay_id]).then(times => { 
//                 last_updated = new Date(times.rows[0].updated_at + 'Z');
//                 currentTime = new Date();
//                 console.log('current: \n' + currentTime + '\nlast:\n' + last_updated);
//             })

//             // sql = `UPDATE bay_sensors SET status = $1 WHERE bay_id = $2;`;
//             // pool.query(sql, ["nothing!!", newBays.bay_id]).then(results => { 
//             //     //res.json(results.rows);     
//             // })

//         })
//         sql = `SELECT * FROM bay_restrictions r, bay_sensors s WHERE s.bay_id = r.bayid ORDER BY s.bay_id;`
//         pool.query(sql, []).then(sqlresults => { 
//             res.json(sqlresults.rows);
//             // mainMap(results.rows);
//         })
//     })
// })

// app.get('/nothing', (req, res) => {
//  console.log('im here');
// })


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








