const mongoose = require('mongoose')
const CustomErrorHandler = require('../utils/custom.error.handler')
const verifyJWT = require('../utils/jwt/verify.jwt.token')
const User = require('../models/user')
const ObjectId = require("mongoose").Types.ObjectId;

// validate user id
const validateUserId = async (req, res, next) => {
    if (!req.body) return new CustomErrorHandler(400, "Invalid Request")

    const authToken = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : ""

    if (!authToken) return new CustomErrorHandler(400, "User Id Not Found")

    const { sub } = await verifyJWT.authenticateJWT(authToken)

    const isValid = mongoose.Types.ObjectId.isValid(sub)

    if (!isValid) return new CustomErrorHandler(400, "Invalid UserId")

    if (!sub) return CustomErrorHandler.serverError("Somethign Went Wrong")

    const user = await User.findOne({ _id: new ObjectId(sub) })

    if (!user) return new CustomErrorHandler(400, "Invalid UserId")

    req.user = user

    next()
}

// validate user name
const validateName = (req, res, next) => {
    if (!req.body) return new CustomErrorHandler(400, "Invalid Request")

    if (!req.body.name) return new CustomErrorHandler(400, "Invalid Name")

    const regex = /^[A-Za-z\s]+$/;
    const result = regex.test(req.body.name) && req.body.name.length >= 3 && req.body.name.length <= 25;

    if (!result) return new CustomErrorHandler(400, "Invalid Name")

    next()
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