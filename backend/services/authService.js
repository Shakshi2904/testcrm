const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser, updateUserPassword } = require("../models/userModel");
require("dotenv").config();

exports.signupService = async ({ name, email, password, role_id }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) throw new Error("Email already registered!");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await createUser(name, email, hashedPassword, role_id);
};

exports.signinService = async ({ email, password }) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isHashed = user.password.startsWith("$2a$") || user.password.startsWith("$2b$") || user.password.startsWith("$2y$");
    
    let validPassword = false;
    if (isHashed) {
        validPassword = await bcrypt.compare(password, user.password);
    } else {
        validPassword = password === user.password;
        if (validPassword) {
            const newHashedPassword = await bcrypt.hash(password, 10);
            await updateUserPassword(user.id, newHashedPassword);
            console.log(`Password hashed for user ${user.id}`);
        }
    }

    if (!validPassword) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { userId: user.id, role: user.role_id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    );

    return { token, userId: user.id, role: user.role_id };
};
