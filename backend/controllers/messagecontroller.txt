import Conversation from "../models/conservationmodel.js";
import Message from "../models/messagemodel.js";


export const sendMessage = async (req , res) =>{
    console.log("message sent");
    try {

        const { message } = req.body;    // we are getting message from user as an input
        const { id: receiverId } = req.params; // we get user id or recicever from params
        const senderId = req.user._id;  // we get sender id which we get from "user" in protectroute middleware. Protectroute function also authenticate the sender
         
        let conversation = await Conversation.findOne({   //we find conversertion between user
			participants: { $all: [senderId, receiverId] },
		});


        if (!conversation) {  // for first time conversation , we create one
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

        const newMessage = new Message({ //we get new message and put it there and just send it as an response
			senderId,receiverId,message,
		});

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //SOCKET IO functionality

        //saving message in database
        // await conversation.save();
		// await newMessage.save();

		// this will run in parallel do the same function of upper two lines. both will run in background
        // instead of waiting for await conversation.save(); to finish and then run await newMessage.save();

		await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json({newMessage})
        
    } catch (error) {
        console.log("Error in send message: " , error.message);
        
        res.status(500).json({error:"internal server error in messaging"});
        
    }
    
};


export const getMessages = async (req , res) =>{
    try {

        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages");   //NOT REFRENCE BUT ACTUAL MESAGE. moongoose give us the function which will allow us to get messages in form of arrey instead of id of messages
        
        if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages : " , error.message);
        
        res.status(500).json({error:"internal server error in messaging"});
        
    }
}