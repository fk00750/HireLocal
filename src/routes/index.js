const express = require('express')
const { login, register } = require('../controllers/auth')
const { validateName } = require('../middlewares/validators')
const Router = express.Router()

Router.post("/login", login).post('register', validateName, register)

module.exports = Router