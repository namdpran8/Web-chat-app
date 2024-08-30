import { useEffect } from "react";
import useConversation from "../../sort/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

/**
 * MessageContainer component displays the message view for the selected conversation.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// Cleanup function to reset selected conversation when component unmounts
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{/* Render a message view if a conversation is selected; otherwise, show NoChatSelected */}
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header displaying the selected conversation's name */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					{/* Display messages for the selected conversation */}
					<Messages />
					{/* Input field for sending new messages */}
					<MessageInput />
				</>
			)}
		</div>
	);
};

export default MessageContainer;

/**
 * NoChatSelected component displays a welcome message and instructions when no conversation is selected.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const NoChatSelected = () => {
	const { authUser } = useAuthContext(); // Get the authenticated user context

	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				{/* Welcome message for the user */}
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				{/* Icon representing messaging */}
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
