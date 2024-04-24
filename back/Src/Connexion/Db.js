const mysql = require("mysql2/promise");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "Cars_Agency",
  password: "1234",
  waitForConnections: true,
  multipleStatements: true
});

module.exports = { pool };