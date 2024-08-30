import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

/**
 * Custom hook to handle user signup functionality.
 * 
 * @returns {Object} - The hook's state containing the signup function and loading status
 */
const useSignup = () => {
	const [loading, setLoading] = useState(false); // State to track loading status
	const { setAuthUser } = useAuthContext(); // Function to set the authenticated user in context

	/**
	 * Function to handle user signup.
	 * 
	 * @param {Object} userData - The user data for signup
	 * @param {string} userData.fullName - The full name of the user
	 * @param {string} userData.username - The username of the user
	 * @param {string} userData.password - The password of the user
	 * @param {string} userData.confirmPassword - The password confirmation
	 * @param {string} userData.gender - The gender of the user
	 */
	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		// Validate input fields
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return; // Exit if there are input errors

		setLoading(true); // Set loading to true before starting signup request
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }), // Send user data in the request body
			});
			
			const data = await res.json(); // Parse the JSON response
			if (data.error) {
				throw new Error(data.error); // Throw an error if the response contains an error
			}
			
			// Store user data in local storage and set it in context
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message); // Display an error message if signup fails
		} finally {
			setLoading(false); // Set loading to false when signup request is complete
		}
	};

	return { loading, signup }; // Return the signup function and loading status
};

export default useSignup;

/**
 * Function to handle input validation for signup.
 * 
 * @param {Object} userData - The user data for validation
 * @param {string} userData.fullName - The full name of the user
 * @param {string} userData.username - The username of the user
 * @param {string} userData.password - The password of the user
 * @param {string} userData.confirmPassword - The password confirmation
 * @param {string} userData.gender - The gender of the user
 * @returns {boolean} - True if input is valid, otherwise false
 */
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields"); // Display an error if any fields are empty
		return false; // Input is not valid
	}

	if (password !== confirmPassword) {
		console.log("error here"); // For debugging purposes
		toast.error("Passwords do not match"); // Display an error if passwords do not match
		return false; // Input is not valid
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters"); // Display an error if password is too short
		return false; // Input is not valid
	}

	return true; // Input is valid
}
