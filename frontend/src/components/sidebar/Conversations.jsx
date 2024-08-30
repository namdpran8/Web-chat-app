import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

/**
 * Conversations component fetches and displays a list of conversations.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const Conversations = () => {
	// Destructure loading state and conversations from the custom hook
	const { loading, conversations } = useGetConversations();
	
	// Log the list of conversations to the console for debugging
	console.log("Conversation "+conversations);
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{/* Map through conversations and render a Conversation component for each */}
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id} // Unique key for each conversation
					conversation={conversation} // Pass the conversation data
					emoji={getRandomEmoji()} // Pass a random emoji
					lastIdx={idx === conversations.length - 1} // Check if this is the last conversation
				/>
			))}

			{/* Show a loading spinner if data is still being fetched */}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};

export default Conversations;
