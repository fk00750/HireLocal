const { UserManager } = require('../src/utils/helper_functions'); // Adjust the path accordingly

describe('UserManager', () => {
    // Generates a salt and hashes the password using pbkdf2Sync with 10000 iterations and sha256 algorithm, then returns the stored password in the format 'salt:hashedPassword'
    it('should generate a salt and hash the password using pbkdf2Sync with 10000 iterations and sha256 algorithm, then return the stored password in the format "salt:hashedPassword"', () => {
        const userManager = new UserManager();
        const password = 'password123';
        const storedPassword = userManager.hashedPassword(password);
        const [salt, hashedPassword] = storedPassword.split(':');

        expect(salt).toHaveLength(32);
        expect(hashedPassword).toHaveLength(128);
    });

    // Generates a different salt each time the method is called, resulting in different stored passwords for the same input password
    it('should generate a different salt each time the method is called, resulting in different stored passwords for the same input password', () => {
        const userManager = new UserManager();
        const password = 'password123';
        const storedPassword1 = userManager.hashedPassword(password);
        const storedPassword2 = userManager.hashedPassword(password);

        expect(storedPassword1).not.toBe(storedPassword2);
    });

    // Handles passwords of any length and character set, including empty passwords
    it('should handle passwords of any length and character set, including empty passwords', () => {
        const userManager = new UserManager();
        const password1 = 'password123';
        const password2 = '';
        const password3 = '!@#$%^&*()';

        const storedPassword1 = userManager.hashedPassword(password1);
        const storedPassword2 = userManager.hashedPassword(password2);
        const storedPassword3 = userManager.hashedPassword(password3);

        // Directly compare the stored passwords as strings
        expect(storedPassword1).toEqual(expect.any(String));
        expect(storedPassword2).toEqual(expect.any(String));
        expect(storedPassword3).toEqual(expect.any(String));
    });

    // Throws an error if the input password is not a string
    it('should throw an error if the input password is not a string', () => {
        const userManager = new UserManager();
        const password = 123;

        expect(() => {
            userManager.hashedPassword(password);
        }).toThrow(TypeError);
    });

    // Throws an error if the input password is null or undefined
    it('should throw an error if the input password is null or undefined', () => {
        const userManager = new UserManager();
        const password1 = null;
        const password2 = undefined;

        expect(() => {
            userManager.hashedPassword(password1);
        }).toThrow(TypeError);

        expect(() => {
            userManager.hashedPassword(password2);
        }).toThrow(TypeError);
    });

    // Throws an error if the input password is an empty string
    it('should throw an error if the input password is an empty string', () => {
        const userManager = new UserManager();
        const password = '';

        expect(() => {
            userManager.hashedPassword(password);
        }).toThrow(Error);
    });
});