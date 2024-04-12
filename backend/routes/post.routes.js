const express = require("express");
const {database} = require("../config/db")

const postRouter = express.Router();

postRouter.get("/",(req,res)=>{
    try{
        const query = "SELECT * FROM post";

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

postRouter.get("/:id", (req, res) => {
    try {
        const userId = req.params.id;
        const query = "SELECT * FROM post WHERE userId = ?";

        database.query(query, [userId], (err, result) => {
            if (err) {
                console.log("Error while getting data",err);
                res.status(500).send({ error: "Error while getting data" });
            } else {
                if (result.length === 0) {
                    res.status(404).send({ error: "post not found" });
                } else {
                    res.status(200).send(result[0]);
                }
            }
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


postRouter.post("/",(req,res)=>{
    try{
        const query = "INSERT INTO post(id, name, userId, title, body, company) VALUES(?,?,?,?,?,?)";

        const {id,name,userId,title,body,company} = req.body;
        database.query(query,[id,name,userId,title,body,company], (err,result)=>{
            if(err){
                console.log("error while posting data",err);
            }
            else{
                res.status(200).json({msg:"Successfuly post the posts"});
            }
        });
    }
    catch(err){
        res.status(200).send({err});
    }
});


module.exports = {
    postRouter
}