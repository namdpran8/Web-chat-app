// src/components/mobileViewHome/mobileComponent.jsx

import MobileSidebar from '../../../components/sidebar/MobileSidebar/MobileSidebar'; // Sidebar for mobile view
import MessageContainer from '../../../components/messages/MobileMessageContainer'; // Message container for mobile view
import { useState } from 'react';

const MobileComponent = () => {
    const [showMessages, setShowMessages] = useState(false);

    const handleConversationSelect = () => {
        setShowMessages(true);
    };

    const handleBack = () => {
        setShowMessages(false);
    };

    return (
        <div className="mobile-view-container">
            <div className={`mobile-sidebar ${showMessages ? 'hide' : ''}`}>
                <MobileSidebar onSelectConversation={handleConversationSelect} />
            </div>
            {showMessages && (
                <div className="mobile-message-container">
                    <MessageContainer onBack={handleBack} />
                </div>
            )}
        </div>
    );
};

export default MobileComponent;
