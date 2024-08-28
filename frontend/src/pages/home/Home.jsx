import { useState } from 'react';
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className='relative flex h-full sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<div className={`${isSidebarOpen ? 'block' : 'hidden'} sm:block`}>
				<Sidebar />
			</div>
      		<MessageContainer />
			
			{/* Toggle Button for Sidebar */}
			<button 
				className='absolute top-4 left-4 sm:hidden bg-blue-500 text-white p-2 rounded' 
				onClick={toggleSidebar}
			>
				Toggle Sidebar
			</button>
		</div>
	);
};

export default Home;
