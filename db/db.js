const pg = require('pg')
let pool

if (process.env.NODE_ENV === 'production') {
  pool = new pg.Pool({ connectionString: process.env.DATABASE_URL }) // connect to the database on heroku
} else {
  pool = new pg.Pool({ database: 'parkdev1' }) // connect to the database
}

module.exports = {
  query: (sql, params) => {
    return pool.query(sql, params)
  }
}