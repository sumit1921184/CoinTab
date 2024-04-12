const {database} = require ("../config/db");

function ensureTable(req,res,next){
    const query = `CREATE TABLE IF NOT EXISTS user(
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        website VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL
    )`

    database.query(query, (err,result) => {
        if(err){
            console.log("Error in ncreating table",err);
        }
        else{
            console.log("table created");
            next();
        }
    })
}

module.exports = {
    ensureTable
}