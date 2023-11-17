const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    status: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, required: true
    },
    jobId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    workType: {
        type: String,
        required: true
    },
    numberOfLaborers: {
        type: Number,
        default: 1
    },
    location: {
        type: String,
        required: true
    }
})

const Job = mongoose.model("Job",jobSchema)

module.exports = Job