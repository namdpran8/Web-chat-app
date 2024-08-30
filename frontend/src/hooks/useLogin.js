import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

/**
 * Custom hook to handle user login functionality.
 * 
 * @returns {Object} - The hook's state containing loading status and login function
 */
const useLogin = () => {
	const [loading, setLoading] = useState(false); // State to track loading status
	const { setAuthUser } = useAuthContext(); // Function to set the authenticated user in context

	/**
	 * Function to handle user login.
	 * 
	 * @param {string} username - The username entered by the user
	 * @param {string} password - The password entered by the user
	 */
	const login = async (username, password) => {
		console.log(username + " " + password); // For debugging purposes
		
		// Validate input fields
		const success = handleInputErrors(username, password);
		if (!success) return; // Exit if there are input errors

		setLoading(true); // Set loading to true before starting login request
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }), // Send credentials to server
			});

			const data = await res.json(); // Parse the JSON response
			if (data.error) {
				throw new Error(data.error); // Throw an error if the response contains an error
			}

			// Store user data in local storage and set it in context
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message); // Display an error message if login fails
		} finally {
			setLoading(false); // Set loading to false when login request is complete
		}
	};

	return { loading, login }; // Return the current loading status and login function
};

export default useLogin;

/**
 * Function to handle input validation for login.
 * 
 * @param {string} username - The username entered by the user
 * @param {string} password - The password entered by the user
 * @returns {boolean} - True if input is valid, otherwise false
 */
function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields"); // Display an error if fields are empty
		return false; // Input is not valid
	}

	return true; // Input is valid
}
