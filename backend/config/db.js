const mysql = require("mysql");

const database = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"27112000",
    database:"cointab"
})

module.exports = {
    database
}