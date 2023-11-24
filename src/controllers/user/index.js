const UserProfile = (req, res, next) => {
    try {
        const { role, name, email, mobile } = req.user

        res.status(200).json({
            role, name, email, mobile
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { UserProfile }
