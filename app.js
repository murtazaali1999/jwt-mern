const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

app.use([express.json])

mongoose.connect(process.env.KEY, () => {
    console.log("MONGO CONNECTION MADE");

    app.listen(process.env.PORT, () => {
        console.log(`Working at PORT--> ${process.env.PORT}`)
    })
})