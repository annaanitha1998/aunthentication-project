const express = require('express')
const {
    loginUser,
    registerUser,
    userHome
} = require('../controller/user')
const { validateToken } = require('../utils/middleware')

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/home', validateToken, userHome);

module.exports = router