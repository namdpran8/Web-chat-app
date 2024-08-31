import { useEffect } from "react";
import useConversation from "../../sort/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";


function MobileMessageContainer() {
 const { selectedConversation, setSelectedConversation } = useConversation();
  console.log(selectedConversation.fullName);
  
  useEffect(() => {
    // Cleanup function to reset selected conversation when component unmounts
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col h-screen ">
          
          {/* Header displaying the selected conversation's name */}
          <div className="bg-slate-500 px-4 py-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
          </div>
          {/* Display messages for the selected conversation */}
          <div className="flex-grow overflow-y-auto">
            <Messages />
          </div>
          {/* Input field for sending new messages, fixed at the bottom */}
          <div className="sticky bottom-0 w-full">
            <MessageInput />
          </div>
        
    </div>
  );
}

export default MobileMessageContainer;
