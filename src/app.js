const express = require("express");
const morgan = require("morgan");
const Router = require("./routes");

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.status(200).send("Welcome !!!")
})

app.use('/api', Router)

module.exports = app