const express = require("express");
const {database} = require("./config/db");
const {userRouter} = require("./routes/user.routes");
const {ensureTable} = require("./middleware/ensureTable.middleware");
const {ensureTablePost} = require("./middleware/ensureTablePost.middleware");
const cors = require("cors");
const { postRouter } = require("./routes/post.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user",ensureTable,userRouter);
app.use("/post",ensureTablePost,postRouter);


app.get("/",(req,res)=>{
    res.status(200).json({msg:"this is home route"});
})

app.listen(8080,()=>{
    database.connect((err)=>{
        if(err){
            console.log("we got error while connectioin with databse",err);

        }
        else{
            console.log("connected to database");
        }
    })
})