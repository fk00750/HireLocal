const express = require('express')
const { login, register } = require('../controllers/auth')
const { validateName, validateUserId } = require('../middlewares/validators')
const Router = express.Router()

Router.post("/login", validateUserId, login).post('/register', validateName, register)

module.exports = Router