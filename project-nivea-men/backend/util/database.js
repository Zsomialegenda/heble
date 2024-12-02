const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.HOST || 'localhost',
  user: process.env.USERNAME || 'root',
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || 'Users',
  port: process.env.DATABASE_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;


 
db.query('SELECT 1 + 1 AS solution').then(([rows]) => {
    console.log('The solution is: ', rows[0].solution);
    console.log("Database Config:", {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });      
}).catch(console.log);