import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

/**
 * Custom hook to handle user logout functionality.
 * 
 * @returns {Object} - The hook's state containing loading status and logout function
 */
const useLogout = () => {
	const [loading, setLoading] = useState(false); // State to track loading status
	const { setAuthUser } = useAuthContext(); // Function to clear the authenticated user in context

	/**
	 * Function to handle user logout.
	 */
	const logout = async () => {
		setLoading(true); // Set loading to true before starting logout request
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" }, // Specify JSON content type
			});
			
			const data = await res.json(); // Parse the JSON response
			if (data.error) {
				throw new Error(data.error); // Throw an error if the response contains an error
			}

			// Remove user data from local storage and clear user context
			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message); // Display an error message if logout fails
		} finally {
			setLoading(false); // Set loading to false when logout request is complete
		}
	};

	return { loading, logout }; // Return the current loading status and logout function
};

export default useLogout;
