const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter the user name']
        },
        password: {
            type: String,
            required: [true, 'Please enter the password']
        },
        email: {
            type: String,
            required: [true, 'Please enter the email'],
            unique: [true, 'Email already taken']
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)