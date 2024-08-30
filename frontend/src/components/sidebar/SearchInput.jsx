import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../sort/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

/**
 * SearchInput component allows users to search for a conversation by name.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const SearchInput = () => {
	// State to hold the current search input value
	const [search, setSearch] = useState("");
	// Destructure the function to set the selected conversation from the custom hook
	const { setSelectedConversation } = useConversation();
	// Get the list of conversations from the custom hook
	const { conversations } = useGetConversations();

	/**
	 * Handles form submission for the search input.
	 * 
	 * @param {Object} e - The event object
	 */
	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		// Return if the search input is empty
		if (!search) return;

		// Show an error toast if the search term is less than 3 characters long
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		// Find the conversation that matches the search term
		const conversation = conversations.find((c) => 
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		// If a conversation is found, set it as the selected conversation and clear the search input
		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			// Show an error toast if no conversation matches the search term
			toast.error("No such user found!");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			{/* Search input field */}
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)} // Update search state on input change
			/>
			{/* Submit button with search icon */}
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};

export default SearchInput;
