/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// Create a Context for authentication
export const AuthContext = createContext();

/**
 * Custom hook to use the AuthContext.
 * 
 * @returns {Object} - The context value containing authUser and setAuthUser
 */
export const useAuthContext = () => {
	return useContext(AuthContext);
};

/**
 * Provider component to wrap around parts of the app that need access to authUser and setAuthUser.
 * 
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - The child components that will have access to the context
 * @returns {JSX.Element} - The rendered component
 */
export const AuthContextProvider = ({ children }) => {
	// Initialize authUser from localStorage or set to null if not found
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	return (
		<AuthContext.Provider value={{ authUser, setAuthUser }}>
			{children} {/* Render child components with access to authUser and setAuthUser */}
		</AuthContext.Provider>
	);
};
