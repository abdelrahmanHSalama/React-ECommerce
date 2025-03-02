import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const SECRET_KEY = new TextEncoder().encode("superSecretKey");

// 🔹 Generate JWT Token
export const generateToken = async (user) => {
    return await new SignJWT({ email: user.email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(SECRET_KEY);
};

// 🔹 Verify JWT Token
export const verifyToken = async (token) => {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload; // Returns { email }
    } catch (error) {
        return null; // Invalid token
    }
};

// 🔹 Hash Password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// 🔹 Compare Passwords
export const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
