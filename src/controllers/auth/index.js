const User = require("../../models/user");

const login = async (req, res, next) => {
    try {
        // Your login logic here
        const user = await User.find({})
        // Assuming you want to send a response
        res.status(200).send(user);
    } catch (error) {
        console.error(`Error: src > controllers > auth > index.js > login - ${error.message}`);
        next(error); // Pass the error to the next middleware or error handler
    }
};


const register = (req, res, next) => {
    try {
        res.status(200).send("login")
    } catch (error) {
        console.log(`Error: src > controllers > auth > index.js > register - ${error.message}`)
        next(error)
    }
}

module.exports = { login, register }