import mongoose from "mongoose";

// Define the schema for the Message model
const messageSchema = new mongoose.Schema(
    {
        // ID of the user who sent the message, referenced from the User model
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true, // Ensures that senderId is provided
        },
        // ID of the user who will receive the message, referenced from the User model
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true, // Ensures that receiverId is provided
        },
        // The actual message content
        message: {
            type: String,
            required: true, // Ensures that the message content is provided
        },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create the Message model using the schema
const Message = mongoose.model("Message", messageSchema);

export default Message;
