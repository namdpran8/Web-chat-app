import User from "../models/usermodel.js";

// Controller for fetching users for the sidebar
export const getUsersForSidebar = async (req, res) => {
    try { 
        // Get the ID of the logged-in user from the authenticated request
        const loggedInUserId = req.user._id;

        // Find all users except the logged-in user, excluding the password field
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } })
                                       .select("-password"); // Exclude the password field from the result

        // Respond with the filtered list of users
        res.status(200).json(filteredUser);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        // Respond with an error message and status code 500 in case of an internal server error
        res.status(500).json({ error: "Internal server error" });
    }
};
