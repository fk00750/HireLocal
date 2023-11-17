const User = require("../../models/user");
const CustomErrorHandler = require("../../utils/custom.error.handler");
const { UserManager } = require("../../utils/helper_functions");
const IssueAccessToken = require("../../utils/jwt/issue.jwt.token");
const userManager = new UserManager();


const login = async (req, res, next) => {
    console.log("LOG IN")
    try {
        const { email, mobile, password } = req.body;

        const user = email
            ? await userManager.findUserByEmail(email)
            : mobile
                ? await userManager.findUserByMobile(mobile)
                : null;

        if (!user) return CustomErrorHandler.notFound("User Not Found");

        // check password
        const isPasswordValid = userManager.verifyPassword(password, user.password)

        if (!isPasswordValid) return CustomErrorHandler.wrongCredentials("Invalid Password")

        // issue token
        const token = await IssueAccessToken.issueAccessToken(user._id)

        if (!token) return CustomErrorHandler.somethingWentWrong()

        res.status(200).json({
            success: true,
            token: token,
            role: user.role,
            message: "Login successful",
        });
    } catch (error) {
        console.error(`Error: src > controllers > auth > index.js > login - ${error.message}`);
        next(error); // Pass the error to the next middleware or error handler
    }
};

const register = async (req, res, next) => {
    try {
        // Check if user already exits
        const { name, email, mobile, password, role } = req.body;

        const user = email
            ? await userManager.findUserByEmail(email)
            : mobile
                ? await userManager.findUserByMobile(mobile)
                : null;

        if (user) return next(CustomErrorHandler.alreadyExist("user already exist"))

        // create user
        const isUserCreated = await userManager.createUser(name, email, mobile, role, password)

        if (!isUserCreated) return next(CustomErrorHandler.somethingWentWrong())

        res.status(200).json({
            message: "success"
        })
    } catch (error) {
        console.log(`Error: src > controllers > auth > index.js > register - ${error.message}`)
        next(error)
    }
}

module.exports = { login, register }