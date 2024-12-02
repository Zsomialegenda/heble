const mysql = require('mysql2/promise');
require('dotenv').config(); // Load .env variables

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "Users",
    port: process.env.DATABASE_PORT || 3306, // Default to 3306 if not specified
    connectionLimit: 10 // Optional: limits number of simultaneous connections
});

db.query('SELECT 1 + 1 AS solution').then(([rows]) => {
    console.log('The solution is: ', rows[0].solution);
}).catch(console.log);


module.exports = db;
 