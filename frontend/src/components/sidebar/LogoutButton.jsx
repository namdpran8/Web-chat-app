import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

/**
 * LogoutButton component renders a button that triggers the logout process.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const LogoutButton = () => {
	// Destructure loading state and logout function from the custom hook
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{/* Conditionally render the logout icon or loading spinner based on the loading state */}
			{!loading ? (
				// Display logout icon and trigger logout function on click
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				// Display loading spinner while the logout process is in progress
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};

export default LogoutButton;
