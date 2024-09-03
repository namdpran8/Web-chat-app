// src/components/mobileViewHome/mobileComponent.jsx

import MobileSidebar from '../../../components/sidebar/MobileSidebar/MobileSidebar'; // Sidebar for mobile view
import MobileMessageContainer from '../../../components/messages/MobileMessageContainer'; // Message container for mobile view


const MobileComponent = () => {
    return (
        <>
        <div className="mobile-view-container">
            <MobileSidebar/>
        </div>
        <div className=''>
            <MobileMessageContainer />
        </div>
        </>
    );
};

export default MobileComponent;
