const express = require("express");
const morgan = require("morgan");
const Router = require("./routes");
const errorHandler = require('./middlewares/error.handler')
const passport = require('passport')
const { passportConfig } = require('./config/config.passport')
const session = require('express-session')
const cors = require('cors')

const app = express()

passportConfig(passport)

app.use(
    session({
        secret: "yoursecretkey",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }, // for demo purpose only, set to true in a production environment
    })
);

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"))
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).send("Welcome !!!")
})

app.use('/api', Router)

app.use(errorHandler)

module.exports = app