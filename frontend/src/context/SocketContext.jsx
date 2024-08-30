/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

// Create a Context for WebSocket connections
const SocketContext = createContext();

/**
 * Custom hook to use the SocketContext.
 * 
 * @returns {Object} - The context value containing socket and onlineUsers
 */
export const useSocketContext = () => {
	return useContext(SocketContext);
};

/**
 * Provider component to manage WebSocket connections and online users.
 * 
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - The child components that will have access to the context
 * @returns {JSX.Element} - The rendered component
 */
export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null); // State to hold the WebSocket instance
	const [onlineUsers, setOnlineUsers] = useState([]); // State to hold the list of online users
	const { authUser } = useAuthContext(); // Get the authenticated user context

	useEffect(() => {
		// Set up the WebSocket connection when authUser is available
		if (authUser) {
			const socket = io("http://localhost:4000", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// Listen for online users updates from the server
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// Clean up the WebSocket connection on component unmount or when authUser changes
			return () => {
				socket.close();
				setSocket(null); // Ensure socket state is cleared
			};
		} else {
			// Close the socket connection if authUser is not available
			if (socket) {
				socket.close();
				setSocket(null); // Ensure socket state is cleared
			}
		}
	}, [authUser]); // Effect depends on authUser, re-run when authUser changes

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children} {/* Render child components with access to socket and onlineUsers */}
		</SocketContext.Provider>
	);
};
