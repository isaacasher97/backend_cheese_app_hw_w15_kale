//Dependencies
require("dotenv").config();
const { PORT = 3000 } = process.env;
const express = require("express");
const app = express();

//ROUTES

//test route
app.get('/', (req, res) => {
    res.json({
        "hello": "world"
    })
});

//Listener
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))