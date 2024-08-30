import mongoose from "mongoose";

// Define the schema for the Conversation model
const conversationSchema = new mongoose.Schema(
    {
        // Participants of the conversation, referenced from the User model
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference to the User model
            },
        ],
        // Messages in the conversation, referenced from the Message model
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message", // Reference to the Message model
                default: [], // Default to an empty array for new conversations
            },
        ],
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create the Conversation model using the schema
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
