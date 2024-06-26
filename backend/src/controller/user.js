const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const { UserModel } = require('../database');
const { logger } = require('../utils/middleware');
const { error } = require("../utils/error");
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        res.status(400)
        logger.error(error.MANDATORY_FIELD)
        throw new Error(error.MANDATORY_FIELD)
    }
    var passwordValidation = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).{8,}$/;
    if (!password.match(passwordValidation)) {
        res.status(400)
        logger.error(error.PASSWORD_VALIDATION)
        throw new Error(error.PASSWORD_VALIDATION)
    }
    const userAvailable = await UserModel.findOne({ email })
    if (userAvailable) {
        res.status(400)
        logger.error(error.DUPLICATE_EMAIL)
        throw new Error(error.DUPLICATE_EMAIL)
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Hashed password', hashedPassword)
    const user = await UserModel.create({
        username,
        password: hashedPassword,
        email
    })
    if (user) {
        res.status(200).json({ _id: user._id, email: user.email });
    } else {
        res.status(400)
        logger.error(error.VALIDITY)
        throw new Error(error.VALIDITY)
    }

});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        logger.error(error.MANDATORY_FIELD)
        throw new Error(error.MANDATORY_FIELD)
    }
    const user = await UserModel.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {
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
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        logger.error(error.LOGIN)
        throw new Error(error.LOGIN)
    }
});

const userHome = asyncHandler(async (req, res) => {
    logger.info('Welcome to the application')
    res.status(200).json({ message: 'Welcome to the application' })
})

module.exports = { registerUser, loginUser, userHome }