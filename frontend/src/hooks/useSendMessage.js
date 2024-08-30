import { useState } from "react";
import useConversation from "../sort/useConversation";
import toast from "react-hot-toast";

/**
 * Custom hook to handle sending messages functionality.
 * 
 * @returns {Object} - The hook's state containing the sendMessage function and loading status
 */
const useSendMessage = () => {
	const [loading, setLoading] = useState(false); // State to track loading status
	const { messages, setMessages, selectedConversation } = useConversation(); // Get and manage conversation messages and selected conversation

	/**
	 * Function to send a message to the server.
	 * 
	 * @param {string} message - The message content to be sent
	 */
	const sendMessage = async (message) => {
		setLoading(true); // Set loading to true before starting the send request
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Specify JSON content type
				},
				body: JSON.stringify({ message }), // Send the message content in the request body
			});
			
			const data = await res.json(); // Parse the JSON response
			if (data.error) throw new Error(data.error); // Throw an error if the response contains an error

			// Update messages state with the newly sent message
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message); // Display an error message if sending fails
		} finally {
			setLoading(false); // Set loading to false when send request is complete
		}
	};

	return { sendMessage, loading }; // Return the sendMessage function and loading status
};

export default useSendMessage;
