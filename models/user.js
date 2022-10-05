const mongoose = require("mongoose");


const userModel = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name field is essential"]
    },
    email: {
        type: String,
        required: [true, "Email field is essential"]
    },
    password: {
        type: String,
        required: [true, "Password field is essential"]
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userModel);