import User from "../models/usermodel.js";

export const getUsersForSidebar = async (req , res) =>{
    try { 
        const  loggedInUserId = req.user._id ;

        const filtereduser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); //find every user in our database but not the logged in user 
        //const allUser = await User.find(); this will gonna find all user including the logged user

        res.status(200).json(filtereduser);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}