import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

/**
 * Messages component displays the list of messages in the current conversation.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const Messages = () => {
	const { messages, loading } = useGetMessages(); // Get messages and loading state from the custom hook
	useListenMessages(); // Hook to listen for new messages
	const lastMessageRef = useRef(); // Ref to keep track of the last message for scrolling

	useEffect(() => {
		// Scroll to the bottom of the message list when new messages arrive
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100); // Delay to ensure new messages are rendered
	}, [messages]); // Dependency array to trigger effect when messages change

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{/* Render messages if not loading and messages are available */}
			{!loading && messages.length > 0 && 
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}> {/* Ref for scrolling to the last message */}
						<Message message={message} />
					</div>
				))
			}

			{/* Render loading skeletons if messages are being loaded */}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{/* Display a message if no messages are available and not loading */}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};

export default Messages;
