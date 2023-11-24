const CustomErrorHandler = require("../../utils/custom.error.handler");
const { WorkerManager } = require("../../utils/helper_functions");
const ObjectId = require('mongoose').Types.ObjectId

const workerManager = new WorkerManager()

const postWorkerInfo = async (req, res, next) => {
    try {
        const { _id } = req.user

        if (!_id) return next(CustomErrorHandler.somethingWentWrong());

        const { workType, age, location, specialty, experience, wage } = req.body

        const missingField = !age ? "Please Provide Age" :
            !location ? "Please Provide Location" :
                !specialty ? "Please Mention Specialty" :
                    !experience ? "Please Mention experience" : null

        if (missingField) return next(CustomErrorHandler.somethingWentWrong(missingField));

        const workerId = new ObjectId(_id);

        const isWorkerCreated = await workerManager.createWorker(workerId, workType, age, location, specialty, experience, wage)

        if (!isWorkerCreated) return next(CustomErrorHandler.somethingWentWrong());

        return res.status(200).json({
            message: "success",
        });
    } catch (error) {
        console.log(error)
        console.log(`src > controllers > worker > index.js > postWorkerInfo: ${error.messag}`)
        next(error)
    }
}

const getWorker = async (req, res, next) => {
    try {
        const { _id, name, email, mobile } = req.user

        const worker = await workerManager.getWorkerAdditionalDetails(_id)

        if (!worker) return next(CustomErrorHandler.notFound("Worker Not Found"))

        const { workType, age, location, experience, wage } = worker

        res.status(200).json({ name, email, mobile, workType, age, location, experience, wage })
    } catch (error) {
        console.log(`src > controllers > worker > index.js > getWorker: ${error.message}`)
        next(error)
    }
}

module.exports = { postWorkerInfo, getWorker }