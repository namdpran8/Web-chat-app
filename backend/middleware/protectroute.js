import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const protectRoute =async (req , res , next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            console.log("unauthorized - no token found");
            return res.status(401).json({error:"unauthorized - no token found"});            
        }

        const decodeed = jwt.verify(token , process.env.JWT_SECRET);

        if(!decodeed) {
            console.log("unauthorized - token not authoised");            
            return res.status(402).json({error:"unauthorized - token not authoised"});
        }

        const user = await User.findById(decodeed.userId).select("-password");

        if(!user) {
            console.log("unauthorized - user not found");            
            return res.status(402).json({error:"unauthorized - user not found"});
        }


        req.user = user //authenticaded user
        next();

    } catch (error) {
        console.log("error in protect route middleware" , error.message);        
        res.send(500).json({error:"Internal server error at authentcation"})
    }
}


export default protectRoute;