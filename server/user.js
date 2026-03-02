import argon2 from "argon2";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String },
    password: { type: String, required: true }
})

const User = mongoose.model('user', userSchema);

export const createNewUser = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastname } = req.body;
    console.log(req.body);
    try {
        console.log("Test 1");
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        console.log("Test 2");
        if (existingUser) {
            console.log("Test 3");
            return res.status(400).json({ message: "User already exists" });
        }
        else {
            console.log("Test 3");
            console.log("Test 4 111");
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Passwords don't match" });
            }

            try {
                console.log("Test 4");

                const hashedPassword = await argon2.hash(password);

                console.log(hashedPassword);

                console.log("Test 5");

                const newUser = new User({ email, password: hashedPassword, name: `${firstName} ${lastname}` });

                await newUser.save();



                const secretKey = process.env.JWT_SECRET;
                var token = jwt.sign({ email: newUser.email, uid: newUser._id, name: `${firstName} ${lastname}` }, secretKey, { expiresIn: "1h" });

                res.status(200).json({ result: newUser, token });
            }
            catch (err) {
                console.log(err);
            }

            console.log("Test 6 - Success");
        }


    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signInUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        console.log("Test 1");
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        else {
            const isPasswordCorrect = await argon2.verify(existingUser.password, password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
            else {
                const secretKey = process.env.JWT_SECRET;
                var token = jwt.sign({ email: existingUser.email, uid: existingUser._id, name: existingUser.name }, secretKey, { expiresIn: "1h" });

                res.status(200).json({ result: existingUser, token });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}
