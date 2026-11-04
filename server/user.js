import argon2 from "argon2";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    id: { type: String },
    password: { type: String, required: true }
}, { timestamps: true })

const User = mongoose.model('user', userSchema);

const buildAuthPayload = (userDoc) => ({
    uid: userDoc._id.toString(),
    _id: userDoc._id,
    name: userDoc.name,
    email: userDoc.email,
});

const buildToken = (userDoc) => {
    const secretKey = process.env.JWT_SECRET || "gmart_fallback_secret";
    return jwt.sign(
        { email: userDoc.email, uid: userDoc._id.toString(), name: userDoc.name },
        secretKey,
        { expiresIn: "7d" }
    );
};

export const createNewUser = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastname } = req.body || {};
    const normalizedEmail = (email || "").trim().toLowerCase();
    const normalizedFirstName = (firstName || "").trim();
    const normalizedLastName = (lastname || "").trim();

    if (!normalizedEmail || !password || !confirmPassword || !normalizedFirstName || !normalizedLastName) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords don't match" });
    }

    try {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            email: normalizedEmail,
            password: hashedPassword,
            name: `${normalizedFirstName} ${normalizedLastName}`,
        });

        await newUser.save();
        const token = buildToken(newUser);

        return res.status(201).json({ result: buildAuthPayload(newUser), token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signInUser = async (req, res) => {
    const { email, password } = req.body || {};
    const normalizedEmail = (email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await argon2.verify(existingUser.password, password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = buildToken(existingUser);
        return res.status(200).json({ result: buildAuthPayload(existingUser), token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
