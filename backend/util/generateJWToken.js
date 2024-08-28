import jwt from "jsonwebtoken";

const tokenandcookie =( userId , res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET ,{expiresIn:"15d"});

res.cookie("jwt" , token , {
    maxAge : 15 * 24 * 60 * 60* 1000, //converting 15 days to milisecond
    httpOnly: true, //prevent accessing cooking from javascript or XSS attacks cross-site scrpting attacks
    samesite: "strict" ,// prevent CRSF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development"
})
}

export default tokenandcookie;


