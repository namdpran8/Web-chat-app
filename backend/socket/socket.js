import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// Create an HTTP server and attach the Express app to it
const server = http.createServer(app);

// Initialize a new Socket.IO server instance and configure CORS options
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"], // Allowed origin for CORS requests
		methods: ["GET", "POST"], // Allowed HTTP methods
	},
});

// Export a function to get the socket ID of a specific user
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

// Map to store user IDs and their corresponding socket IDs
const userSocketMap = {}; // {userId: socketId}

// Handle new connections to the Socket.IO server
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	// Retrieve the userId from the connection query parameters
	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// Emit an event to all connected clients with the list of online users
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// Handle disconnections
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		// Emit an event to all connected clients with the updated list of online users
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

// Export the Express app, Socket.IO instance, and HTTP server for use in other parts of the application
export { app, io, server };
