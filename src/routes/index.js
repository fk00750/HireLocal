const express = require('express')
const { login, register } = require('../controllers/auth')
const Router = express.Router()

Router.post("/login", login).post('register', register)

module.exports = Router