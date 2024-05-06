require('dotenv').config();
const mysql = require('mysql2/promise');

//create the connection to database
//const connection = mysql.createConnection({
// host: process.env.DB_HOST,
// port: process.env.DB_PORT,
// user: process.env.DB_USER,
//  password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
//});

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 11,
    queueLimit: 0
});

module.exports = connection