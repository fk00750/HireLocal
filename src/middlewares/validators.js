const mongoose = require('mongoose')
const CustomErrorHandler = require('../utils/custom.error.handler')


// validate user id
const validateUserId = (req, res, next) => {
    if (!req.body) return new CustomErrorHandler(400, "Invalid Request")

    const authToken = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : ""

    if (!authToken) return new CustomErrorHandler(400, "User Id Not Found")

    const isValid = mongoose.Types.ObjectId.isValid(userId)

    if (!isValid) return new CustomErrorHandler(400, "Invalid UserId")

}   

// validate user name
const validateName = (name) => {
    if (!req.body) return new CustomErrorHandler(400, "Invalid Request")

    if (!req.body.name) return new CustomErrorHandler(400, "Please Provide Name")

    const regex = /^[A-Za-z\s]+$/;
    const result = regex.test(name) && name.length >= 3 && name.length <= 25;
}

// validate user email
const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return regex.test(String(email).toLowerCase())
}

const validateMobile = (mobile) => {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
};


// validate user password
const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{;,:'".<>/?]).{8,}$/;
    return regex.test(password);
};

module.exports = {
    validateUserId, validateName, validateEmail, validateMobile, validatePassword
}