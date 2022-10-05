const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

const user = require("./routes/user");

app.use([express.json(), express.urlencoded({ extended: false })]) //middleware

app.use([user]) //routes

mongoose.connect(process.env.KEY, () => {
    console.log("MONGO CONNECTION MADE");

    app.listen(process.env.PORT, () => {
        console.log(`Working at PORT--> ${process.env.PORT}`)
    })
})