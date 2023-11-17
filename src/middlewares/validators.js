const mongoose = require('mongoose')
const CustomErrorHandler = require('../utils/custom.error.handler')
const verifyJWT = require('../utils/jwt/verify.jwt.token')
const User = require('../models/user')
const ObjectId = require("mongoose").Types.ObjectId;

// validate user id
const validateUserId = async (req, res, next) => {
    if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"))

    const authToken = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : ""

    if (!authToken) return next(new CustomErrorHandler(400, "User Id Not Found"))

    const { sub } = await verifyJWT.authenticateJWT(authToken)

    const isValid = mongoose.Types.ObjectId.isValid(sub)

    if (!isValid) return next(new CustomErrorHandler(400, "Invalid UserId"))

    if (!sub) return next(CustomErrorHandler.somethingWentWrong())

    const user = await User.findOne({ _id: new ObjectId(sub) })

    if (!user) return next(new CustomErrorHandler(400, "Invalid UserId"))

    req.user = user

    next()
}



// validate user name
const validateName = (req, res, next) => {
    try {
        if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"))

        if (!req.body.name) return next(new CustomErrorHandler(400, "Invalid Name"))

        const regex = /^[A-Za-z\s]+$/;
        const result = regex.test(req.body.name) && req.body.name.length >= 3 && req.body.name.length <= 25;

        if (!result) return next(new CustomErrorHandler(400, "Invalid Name"))

        next()
    } catch (error) {
        console.log(`middleware > validators > validateName: ${error.message}`)
        next(CustomErrorHandler.somethingWentWrong(error.message))
    }
}

// validate user email
const validateEmail = (req, res, next) => {
    console.log("PASS 1")
    if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"))

    // if (req.body.mobile) return next()
    if (!req.body.email) return next(new CustomErrorHandler(400, "Invalid Email **"))

    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const result = regex.test(String(req.body.email).toLowerCase())

    if (!result) return next(new CustomErrorHandler(400, "Invalid Email"))

    next()
}

const validateMobile = (req, res, next) => {
    try {
        if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"))

        // if (req.body.email) return next()
        if (!req.body.mobile) return next(new CustomErrorHandler(400, "Invalid Mobile **"))

        const regex = /^\d{10}$/;
        const result = regex.test(req.body.mobile);

        if (!result) return next(new CustomErrorHandler(400, "Invalid Mobile ***"))

        next()
    } catch (error) {
        console.log(`middleware > validators > validateMobile: ${error.message}`)
        next(CustomErrorHandler.somethingWentWrong(error.message))
    }
};


// validate user password
const validatePassword = (req, res, next) => {
    console.log("PASS 2")
    if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"))

    if (!req.body.password) return next(new CustomErrorHandler(400, "Invalid Password"))

    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{;,:'".<>/?]).{8,}$/;
    const result = regex.test(req.body.password);

    if (!result) return next(new CustomErrorHandler(400, "Invalid Password"))

    next()
};

module.exports = {
    validateUserId, validateName, validateEmail, validateMobile, validatePassword
}