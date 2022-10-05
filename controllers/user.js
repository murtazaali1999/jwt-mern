const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandle = require("express-async-handler");
const User = require("../models/user")

const registerUser = asyncHandle(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Enter all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error("User Already Exists");
    }

    const salt = await bcrypt.genSalt(10); //generate's salt
    const hashedPassword = await bcrypt.hash(password, salt); //hashed password

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }

})

const loginUser = asyncHandle(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("One or More fields are empty")
    }

    const user = await User.findOne({ email })

    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWToken(user._id)
        })
    } else {
        throw new Error("Invalid Credentials")
    }
})

const getUserData = asyncHandle(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

const generateJWToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" })
}

module.exports = {
    registerUser,
    loginUser,
    getUserData
}