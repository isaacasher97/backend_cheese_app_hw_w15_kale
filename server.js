//Dependencies
require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
//import mongoose
const mongoose = require("mongoose");


//Database connection
////////////////////////
//establish connection
mongoose.connect(MONGODB_URL)
//connection events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));


//ROUTES

//test route
app.get('/', (req, res) => {
    res.json({
        "hello": "world"
    })
});

//Listener
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))