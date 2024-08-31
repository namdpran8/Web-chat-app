// src/components/mobileViewHome/mobileComponent.jsx

import MobileSidebar from '../../../components/sidebar/MobileSidebar/MobileSidebar'; // Sidebar for mobile view
import MobileMessageContainer from '../../../components/messages/MobileMessageContainer'; // Message container for mobile view
import { useState } from 'react';

const MobileComponent = () => {
    // State to track whether to show the message container or the sidebar
    const [showMessages, setShowMessages] = useState(false);

    // Function to handle conversation selection
    const handleConversationSelect = () => {
        console.log("Conversation selected, showing messages..."); // Debug log
        setShowMessages(true); // This should trigger the MessageContainer rendering
    };

    // Function to handle back navigation
    const handleBack = () => {
        console.log("Back button pressed, showing sidebar..."); // Debug log
        setShowMessages(false); // This should trigger the Sidebar rendering
    };

    console.log("Current state of showMessages:", showMessages); // Debug log to check the state

    return (
        <div className="mobile-view-container">
            {!showMessages ? (
                <MobileSidebar onSelectConversation={handleConversationSelect} />
            ) : (
                <MobileMessageContainer onBack={handleBack} />
            )}
        </div>
    );
};

export default MobileComponent;
