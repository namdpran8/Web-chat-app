/* eslint-disable react/prop-types */

import MobileConversation from "../MobileConversation";
import LogoutButton from "../LogoutButton";
import SearchInput from "../SearchInput";



function MobileSidebar() {
    return (
        <div className="flex flex-col h-screen bg-background">
            <div className="p-4">
                <div className="relative">
                    <SearchInput />
                </div>
            </div>
            <div>
                <MobileConversation />
            </div>
            <div className="p-4 border-t">
                <LogoutButton />
            </div>
        </div>
    );
}

export default MobileSidebar;
