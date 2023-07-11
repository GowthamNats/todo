const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    connectionLimit: 100,
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306,
    database:'todoapp'
})

const promisePool = pool.promise()

module.exports = promisePool
