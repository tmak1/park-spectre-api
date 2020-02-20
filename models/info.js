const db = require('../db/db')

function all() {
    sql = `SELECT * FROM bay_info;`
    return db.query(sql, [])  
}

function create(params) {
    sql = `INSERT INTO bay_info (bayid, deviceid,`
    sql += ` description1, description2, description3, description4, description5, description6,`
    sql += ` typedesc1, typedesc2, typedesc3, typedesc4, typedesc5, typedesc6)`
    sql+= ` VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;` 
    return db.query(sql, [
        params.bayid,
        params.deviceid,
        params.description1,
        params.description2,
        params.description3,
        params.description4,
        params.description5,
        params.description6,
        params.typedesc1,
        params.typedesc2,
        params.typedesc3,
        params.typedesc4,
        params.typedesc5,
        params.typedesc6
    ])  
}


module.exports = { all,create }