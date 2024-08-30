import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

// Middleware function to protect routes by ensuring the user is authenticated
const protectRoute = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            console.log("Unauthorized - no token found");
            return res.status(401).json({ error: "Unauthorized - no token found" });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            console.log("Unauthorized - token not authorized");
            return res.status(401).json({ error: "Unauthorized - token not authorized" });
        }

        // Find the user by the ID from the decoded token, excluding password field
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            console.log("Unauthorized - user not found");
            return res.status(401).json({ error: "Unauthorized - user not found" });
        }

        // Attach the user object to the request object
        req.user = user; // Authenticated user
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.log("Error in protect route middleware:", error.message);
        res.status(500).json({ error: "Internal server error at authentication" });
    }
};

export default protectRoute;
