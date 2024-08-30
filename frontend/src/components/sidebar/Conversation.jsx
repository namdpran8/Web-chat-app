/* eslint-disable react/prop-types */
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../sort/useConversation";

/**
 * Conversation component displays a single conversation item in the list.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.conversation - The conversation data
 * @param {number} props.lastIdx - The index of the conversation in the list (used to conditionally render divider)
 * @param {string} props.emoji - An emoji related to the conversation
 * @returns {JSX.Element} - The rendered component
 */
const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();

	// Check if the current conversation is selected
	const isSelected = selectedConversation?._id === conversation._id;
	// Check if the user is online
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				// Set the selected conversation when clicked
				onClick={() => setSelectedConversation(conversation)}
			>
				{/* Avatar section */}
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				{/* Conversation details */}
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{/* Render a divider if this is not the last conversation */}
			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

export default Conversation;
