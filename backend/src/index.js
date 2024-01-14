const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8800;
const mongoose = require("mongoose");
const route = require('./routes');

app.use(cors());
app.use(express.json());

// Database connection with MongoDB
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to MongoDB..")
}).catch(err=>{
    console.log(err.message);
})

app.use('/',route)

app.listen(PORT, (error)=>{
    if(!error){
        console.log("Server Running on Port " + PORT);
    }
    else{
        console.log("Error: " + error);
    }
})