const db = require('../db/db')

function all() {
    sql = `SELECT * FROM bay_info i, bay_sensors s WHERE s.bay_id = i.bayid ORDER BY s.bay_id;`
    return db.query(sql, [])  
}

module.exports = { all }