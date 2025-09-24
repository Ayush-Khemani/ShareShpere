const mySql = require('mysql2/promise');

const pool = mySql.createPool({
  host: process.env.host,
  user: process.env.user,
  password : process.env.dbPassword,
  database: process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
});


module.exports = pool;

