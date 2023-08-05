//Dependencies
require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
//import mongoose
const mongoose = require("mongoose");
//import middleware
const cors = require("cors");
const morgan = require("morgan");


//Database connection
////////////////////////
//establish connection
mongoose.connect(MONGODB_URL)
//connection events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

//MODELS
const CheeseScehma = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
})

const Cheese = mongoose.model("Cheese", CheeseScehma);



//Middleware
app.use(cors()); // prevent cors error
app.use(morgan('dev')) 
app.use(express.json())// for parsing json bodies  

//ROUTES

//test route
app.get('/', (req, res) => {
    res.json({
        "hello": "world"
    })
});

//CHEESE INDEX ROUTE - GET (gets all cheese)
app.get('/cheese', async (req, res) => {
    try {
        res.json(await Cheese.find({}))
    } catch (error) {
        res.status(400).json(error);
    }
});

//CHEESE CREATE ROUTE - POST - create a new cheese
app.post("/cheese", async (req, res) => {
    try{
        res.json(await Cheese.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
});

//CHEESE SHOW ROUTE - GET - get a single cheese
app.get("/cheese/:id", async (req, res) => {
    try {
        res.json(await Cheese.findById(req.params.id))
    } catch (error) {
        res.status(400).json(error);
    }
});

//Listener
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))