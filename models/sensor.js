const db = require('../db/db')

function all() {
  sql = `SELECT * FROM bay_sensors;`
  return db.query(sql, [])  
}

function create(params) {
  sql = `INSERT INTO bay_sensors (bay_id, st_marker_id, status, lat, lon)`
  sql += ` VALUES ($1, $2, $3, $4, $5) RETURNING *;`
  return db.query(sql, [
      params.bay_id,
      params.st_marker_id,
      params.status,
      params.lat,
      params.lon
  ])
}

function destroy() {
  sql = `DELETE FROM bay_sensors;`
  return db.query(sql, [])
}


module.exports = { all, create, destroy }