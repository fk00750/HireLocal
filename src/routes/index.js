const express = require('express')
const { login, register } = require('../controllers/auth')
const { validateName, validatePassword, validateMobile, validateEmail } = require('../middlewares/validators')
const passport = require('passport')
const { postJob } = require('../controllers/customer')
const Router = express.Router()

Router.post("/login", validateEmail, validateMobile, validatePassword, login).post('/register', validateName, validateEmail, validateMobile, validatePassword, register)
Router.post('/post-job', passport.authenticate("jwt-access", { session: false }), postJob)

module.exports = Router