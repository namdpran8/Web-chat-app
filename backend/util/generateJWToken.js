import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it in a cookie
const tokenandcookie = (userId, res) => {
    // Create a JWT token with a payload containing the userId, using a secret key from environment variables
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });

    // Set the token as a cookie in the response
    res.cookie("jwt", token, {
        // Cookie expiration time set to 15 days, converted to milliseconds
        maxAge: 15 * 24 * 60 * 60 * 1000,
        
        // Mark the cookie as HTTP-only to prevent JavaScript access and mitigate XSS attacks
        httpOnly: true,
        
        // Restrict the cookie to the same site to prevent CSRF attacks
        samesite: "strict",
        
        // Set the cookie to be secure (only sent over HTTPS) in production environments
        secure: process.env.NODE_ENV !== "development"
    });
};

export default tokenandcookie;
