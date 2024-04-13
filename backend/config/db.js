const mysql = require("mysql2");
require('dotenv').config();

const database = mysql.createConnection({
    
    host: process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    port:process.env.sqlPort
})

module.exports = {
    database
}