import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    // Full name of the user
    fullName: {
        type: String,
        required: true, // Ensures that fullName is provided
    },
    // Unique username for the user
    username: {
        type: String,
        required: true, // Ensures that username is provided
        unique: true, // Ensures that username is unique across all users
    },
    // Password for user authentication
    password: {
        type: String,
        required: true, // Ensures that password is provided
        minlength: 6, // Ensures that the password is at least 6 characters long
    },
    // Gender of the user, restricted to 'male' or 'female'
    gender: {
        type: String,
        enum: ["male", "female"], // Limits the values to 'male' or 'female'
    },
    // Profile picture URL of the user
    profilePic: {
        type: String,
        default: "", // Default value is an empty string
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

export default User;
