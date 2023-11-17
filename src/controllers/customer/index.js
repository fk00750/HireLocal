const CustomErrorHandler = require('../../utils/custom.error.handler')
const { randomUUID } = require('crypto');
const { UserManager, JobManager } = require('../../utils/helper_functions');
const ObjectId = require('mongoose').Types.ObjectId
const jobManager = new JobManager()


const postJob = async (req, res, next) => {
    try {
        const { _id } = req.user;

        if (!_id) return next(CustomErrorHandler.somethingWentWrong());

        const { title, description, workType, numberOfLaborers, location } = req.body;

        const missingField = !title
            ? "Please Provide Title"
            : !workType
                ? "Please Provide Work-type"
                : !numberOfLaborers
                    ? "Please Provide Number of Laborers"
                    : !location
                        ? "Please Provide Location"
                        : null;

        if (missingField) return next(CustomErrorHandler.somethingWentWrong(missingField));

        // create job
        const userId = new ObjectId(_id);
        const jobId = randomUUID();

        const isJobCreated = await jobManager.createJob(0, userId, jobId, title, description, workType, numberOfLaborers, location);

        if (!isJobCreated) return next(CustomErrorHandler.somethingWentWrong());

        return res.status(200).json({
            message: "success",
        });
    } catch (error) {
        console.log("src > controllers > customer > index.js > postJob: ", error.message);
        next(error);
    }
};


module.exports = { postJob }