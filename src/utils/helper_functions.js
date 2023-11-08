const mongoose = require('mongoose')

// validate user id
const validateUserId = (userId) => {
    const isValid = mongoose.Types.ObjectId.isValid(userId)
    return isValid === true ? true : false
}

// validate user name
const validateName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name) && name.length >= 3 && name.length <= 25;
}

// validate user email
const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return regex.test(String(email).toLowerCase())
}

// validate user mobile
const validateMobile = () => { }

// validate user password
const validatePassword = () => { }

module.exports = {
    validateUserId, validateName, validateEmail, validateMobile, validatePassword
}