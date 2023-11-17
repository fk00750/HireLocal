const UserProfile = (req, res, next) => {
    try {
        const { name, email, mobile } = req.user

        res.status(200).json({
            name, email, mobile
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { UserProfile }