const mongoose = require('mongoose')

const workerSchema = new mongoose.Schema({
    workerId: {
        type: String,
        required: true,
        unqiue: true
    },
    workType: {
        type: String,
        default: "hourly"
    },
    age: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    wage: {
        type: Number,
        required: true
    }
})

const Worker = mongoose.model("worker", workerSchema)

module.exports = Worker 