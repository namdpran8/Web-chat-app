import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [], //creating an empty arrey that will push message id
			},
		],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("conversation", conversationSchema);

export default Conversation;
