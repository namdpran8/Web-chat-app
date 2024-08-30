import Conversation from "../models/conservationmodel.js";
import Message from "../models/messagemodel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Controller for sending a message
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;  // Get the message content from the request body
        const { id: receiverId } = req.params; // Get the receiver's ID from the request parameters
        const senderId = req.user._id;  // Get the sender's ID from the authenticated user

        // Find an existing conversation between the sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create a new message object
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Add the new message to the conversation's list of messages
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save both the conversation and the new message in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // Retrieve the receiver's socket ID
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // Emit the new message to the receiver's socket
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Respond with the new message
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller for getting messages in a conversation
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; // Get the ID of the user to chat with from the request parameters
        const senderId = req.user._id; // Get the sender's ID from the authenticated user

        // Find the conversation between the sender and the user to chat with, and populate the messages
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // Populate the actual message objects, not just references

        if (!conversation) return res.status(200).json([]); // If no conversation is found, return an empty array

        // Respond with the messages from the conversation
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
