const express = require("express");
const {database} = require("../config/db")

const userRouter = express.Router();

userRouter.get("/",(req,res)=>{
    try{
        const query = "SELECT * FROM user";

        database.query(query,[], (err,result)=>{
            if(err){
                console.log("error while getting data");
            }
            else{
                res.status(200).send(result);
            }
        });
    }
    catch(err){
        res.status(200).send({err});
    }
});

userRouter.get("/:id", (req, res) => {
    try {
        const id = req.params.id;
        const query = "SELECT * FROM user WHERE id = ?";

        database.query(query, [id], (err, result) => {
            if (err) {
                console.log("Error while getting data");
                res.status(500).send({ error: "Error while getting data" });
            } else {
                if (result.length === 0) {
                    res.status(404).send({ error: "User not found" });
                } else {
                    res.status(200).send(result[0]);
                }
            }
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


userRouter.post("/",(req,res)=>{
    try{
        const query = "INSERT INTO user(id, name, email, phone, website, city, company) VALUES(?,?,?,?,?,?,?)";

        const {id,name,email,phone,website,city,company} = req.body;
        database.query(query,[id,name,email,phone,website,city,company], (err,result)=>{
            if(err){
                console.log("error while posting data",err);
            }
            else{
                res.status(200).json({msg:"Successfuly post the user"});
            }
        });
    }
    catch(err){
        res.status(200).send({err});
    }
});


module.exports = {
    userRouter
}