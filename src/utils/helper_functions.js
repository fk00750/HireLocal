const User = require("../models/user")
const crypto = require('crypto')

class UserManager {
    async findUser(criteria) {
        if (!criteria) return false;

        const user = await User.findOne(criteria);

        if (!user) return false;

        return user;
    }

    async findUserByEmail(email) {
        return this.findUser({ email });
    }

    async findUserByMobile(mobile) {
        return this.findUser({ mobile });
    }

    hashedPassword(password) {
        const salt = crypto.randomBytes(16).toString('hex')

        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')

        const storedPassword = `${salt}:${hashedPassword}`

        return storedPassword
    }

    verifyPassword(enteredPassword, storedPassword) {
        const [salt, storedHash] = storedPassword.split(":")

        const enteredHash = crypto.pbkdf2Sync(enteredPassword, salt, 10000, 64, 'sha256').toString('hex')

        return enteredHash === storedHash
    }

    async createUser(name, email, mobile, userRole, password) {
        try {
            // hash password
            const hashedPassword = this.hashedPassword(password)

            if (!hashedPassword) throw error

            // create user
            const user = await User.create({
                name, email, mobile, password: hashedPassword
            })

            if (!user) throw error

            return user
        } catch (error) {
            console.log(`utils > helper_functions > userManager > createUser: ${error.message}`)
            return false
        }
    }
}


module.exports = { UserManager }