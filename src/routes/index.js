const express = require('express')
const { login, register } = require('../controllers/auth')
const { validateName, validatePassword, validateMobile, validateEmail } = require('../middlewares/validators')
const passport = require('passport')
const { postJob } = require('../controllers/customer')
const { UserProfile } = require('../controllers/user')
const { postWorkerInfo, getWorker } = require('../controllers/worker')
const Router = express.Router()

Router.post("/login", validateEmail, validatePassword, login).post('/register', validateName, validateEmail, validateMobile, validatePassword, register)
Router.post('/post-job', passport.authenticate("jwt-access", { session: false }), postJob)
Router.get('/user-profile', passport.authenticate('jwt-access', { session: false }), UserProfile)
Router.post('/complete-worker-profile', passport.authenticate("jwt-access", { session: false }), postWorkerInfo)
Router.get('/get-worker', passport.authenticate('jwt-access', { session: false }), getWorker)

module.exports = Router