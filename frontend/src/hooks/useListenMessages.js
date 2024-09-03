import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

/**
 * Custom hook to listen for new messages via WebSocket and handle notifications.
 */
const useListenMessages = () => {
	const { socket } = useSocketContext(); // Get the WebSocket instance from context
	const { messages, setMessages } = useConversation(); // Get and manage conversation messages

	useEffect(() => {
		/**
		 * Set up a WebSocket listener for 'newMessage' events.
		 * 
		 * @param {Object} newMessage - The new message received from the server
		 */
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true; // Indicate that the message should shake (visual cue)
			
			// Play notification sound to alert the user
			const sound = new Audio(notificationSound);
			sound.play();

			// Update messages state with the new message
			setMessages([...messages, newMessage]);
		});

		// Cleanup listener on component unmount or socket change
		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]); // Dependencies: re-run effect when socket, setMessages, or messages change
};

export default useListenMessages;
