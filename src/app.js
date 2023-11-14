const express = require("express");
const morgan = require("morgan");
const Router = require("./routes");
const errorHandler = require('./middlewares/error.handler')
const passport = require('passport')
const { passportConfig } = require('./config/config.passport')

const app = express()

passportConfig(passport)

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.status(200).send("Welcome !!!")
})

app.use('/api', Router)

app.use(errorHandler)

module.exports = app