/* eslint-disable react/prop-types */
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../sort/useConversation";

/**
 * Message component displays an individual message in the chat.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.message - The message data
 * @returns {JSX.Element} - The rendered component
 */
const Message = ({ message }) => {
	const { authUser } = useAuthContext(); // Get the authenticated user context
	const { selectedConversation } = useConversation(); // Get the selected conversation from the custom hook

	// Determine if the message is sent by the authenticated user
	const fromMe = message.senderId === authUser._id;
	// Format the message creation time
	const formattedTime = extractTime(message.createdAt);
	// Set chat alignment based on the sender of the message
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	// Determine which profile picture to display
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	// Set the background color of the chat bubble based on the sender
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	// Add shake effect if the message should shake
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			{/* Display the avatar image of the sender */}
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			{/* Display the message bubble with appropriate styling */}
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
				{message.message}
			</div>
			{/* Display the message timestamp */}
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
				{formattedTime}
			</div>
		</div>
	);
};

export default Message;
