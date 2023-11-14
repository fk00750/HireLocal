const CustomErrorHandler = require('../../utils/custom.error.handler')

const postJob = async (req, res, next) => {
    try {
        const { _id } = req.user

        if (_id) return next(CustomErrorHandler.somethingWentWrong())

        // create job
        
        res.send("OK")
    } catch (error) {

    }
}

module.exports = { postJob }