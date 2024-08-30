import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

/**
 * MessageInput component allows users to type and send messages.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const MessageInput = () => {
	const [message, setMessage] = useState(""); // State to hold the current message input
	const { loading, sendMessage } = useSendMessage(); // Get loading state and sendMessage function from the custom hook

	/**
	 * Handles form submission for sending a message.
	 * 
	 * @param {Object} e - The event object
	 */
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		// Return if the message input is empty
		if (!message) return;

		// Send the message and clear the input field
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				{/* Input field for typing a message */}
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)} // Update message state on input change
				/>
				{/* Submit button with loading spinner or send icon */}
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />} {/* Show spinner when loading */}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
