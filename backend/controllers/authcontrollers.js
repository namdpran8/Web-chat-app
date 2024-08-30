import User from "../models/usermodel.js";
import bcryptjs from "bcryptjs";
import tokenandcookie from "../util/generateJWToken.js";

// Signup controller
export const signup = async (req, res) => {

    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        // Check if username already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const passsalt = await bcryptjs.genSalt(10); // Higher value means more secure but slower
        const hashpass = await bcryptjs.hash(password, passsalt);

        // Generate profile picture URL based on gender
        const ladkekiphoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const ladkikiphoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user object
        const newUser = new User({
            fullName,
            username,
            password: hashpass, // Store hashed password
            gender,
            profilePic: gender === 'male' ? ladkekiphoto : ladkikiphoto
        });

        // Save user and generate JWT token
        if (newUser) {
            // Generate and set JWT token
            tokenandcookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal Server Error in signup" });
    }
};

// Login controller
export const login = async (req, res) => {
  

    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        // Check if password matches
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate JWT token
        tokenandcookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal Server Error in login" });
    }
};

// Logout controller
export const logout = (req, res) => {
    
    try {
        // Clear the JWT cookie
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
