const { UserManager } = require("../../utils/helper_functions");
const ObjectId = require('mongoose').Types.ObjectId

const userManager = new UserManager()

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

        const isWorkerCreated = await userManager.createWorker(workerId, workType, age, location, specialty, experience, wage)

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

module.exports = { postWorkerInfo }