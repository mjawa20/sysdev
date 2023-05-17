const mysql = require('mysql2');
const config = require('../app/config.json')

const pool = mysql.createPool({
  ...config,
  connectTimeout: 1000,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  multipleStatements: true
});

module.exports = { pool }