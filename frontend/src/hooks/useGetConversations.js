import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/**
 * Custom hook to fetch and manage user conversations.
 * 
 * @returns {Object} - The hook's state containing loading status and conversations
 */
const useGetConversations = () => {
	const [loading, setLoading] = useState(false); // State to track loading status
	const [conversations, setConversations] = useState([]); // State to hold the list of conversations

	useEffect(() => {
		/**
		 * Fetch conversations from the server and handle the response.
		 */
		const getConversations = async () => {
			setLoading(true); // Set loading to true before starting fetch
			try {
				const res = await fetch("/api/users"); // Fetch conversations from the API
				const data = await res.json(); // Parse the JSON response
				if (data.error) {
					throw new Error(data.error); // Throw an error if the response contains an error
				}
				setConversations(data); // Update state with the fetched conversations
			} catch (error) {
				toast.error(error.message); // Display an error message if fetching fails
			} finally {
				setLoading(false); // Set loading to false when fetch is complete
			}
		};

		getConversations(); // Call the fetch function when the component mounts
	}, []); // Empty dependency array to run effect only once on mount

	return { loading, conversations }; // Return loading status and fetched conversations
};

export default useGetConversations;
