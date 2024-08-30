import mongoose from "mongoose";

// Function to connect to MongoDB using Mongoose
const connectToMongoDB = async () => {
	try {
		// Attempt to connect to MongoDB using the URI from environment variables
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Connected to MongoDB"); // Log a success message if the connection is established
	} catch (error) {
		// Catch and log any error that occurs during the connection attempt
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
