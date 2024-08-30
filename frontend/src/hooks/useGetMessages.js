import { useEffect, useState } from "react";
import useConversation from "../sort/useConversation";
import toast from "react-hot-toast";

/**
 * Custom hook to fetch and manage messages for the selected conversation.
 * 
 * @returns {Object} - The hook's state containing messages and loading status
 */
const useGetMessages = () => {
	const [loading, setLoading] = useState(false); // State to track loading status
	const { messages, setMessages, selectedConversation } = useConversation(); // Get conversation data and state management functions

	useEffect(() => {
		/**
		 * Fetch messages from the server based on the selected conversation.
		 */
		const getMessages = async () => {
			setLoading(true); // Set loading to true before starting fetch
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`); // Fetch messages for the selected conversation
				const data = await res.json(); // Parse the JSON response
				if (data.error) throw new Error(data.error); // Throw an error if the response contains an error
				setMessages(data); // Update state with the fetched messages
			} catch (error) {
				toast.error(error.message); // Display an error message if fetching fails
			} finally {
				setLoading(false); // Set loading to false when fetch is complete
			}
		};

		// Fetch messages only if a conversation is selected
		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]); // Effect depends on selectedConversation._id and setMessages

	return { messages, loading }; // Return the current messages and loading status
};

export default useGetMessages;
