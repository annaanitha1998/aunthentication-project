const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const {UserModel} = require('../database');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const {username, password, email} = req.body;
    if(!username || !password || !email) {
        res.status(400)
        throw new Error('Please enter all the mandatory field')
    }
    var passwordValidation = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).{8,}$/;
    if(!password.match(passwordValidation)){
        res.status(400)
        throw new Error(`
• Minimum length of 8 characters
• Contains at least 1 letter.
• Contains at least 1 number.
• Contains at least 1 special character.`)
    }
    const userAvailable = await UserModel.findOne({email})
    if(userAvailable) {
        res.status(400)
        throw new Error('Please enter new user details')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Hashed password', hashedPassword)
    const user = await UserModel.create({
        username,
        password: hashedPassword,
        email
    })
    if(user) {
        res.status(200).json({_id: user._id, email: user.email});
    } else {
        res.status(400)
        throw new Error('User data is not valid')
    }
    
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400)
        throw new Error('Please enter all the mandatory fields')
    }
    const user = await UserModel.findOne({email})
    if(user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                email: user.email,
                _id: user._id,
                username: user.username
            },
            process.env.APP_SECRET,
            {
                expiresIn: '15m'
            }
        )
        res.status(200).json({accessToken})
    } else {
        res.status(401)
        throw new Error('email id or password is not valid')
    }
});

const userHome = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Welcome to the application'})
})

module.exports = { registerUser, loginUser, userHome}