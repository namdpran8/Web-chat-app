import User from "../models/usermodel.js";
import bcryptjs from "bcryptjs";
import tokenandcookie from "../util/generateJWToken.js";
//signup
export const signup = async (req , res ) => {
    console.log("connected to signup ");
    
    try {
        const {fullName , username , password , confirmpassword , gender} = req.body;  
        
        if (password !== confirmpassword) {
            return res.status(400).json({error:"Password don't matach"})
            }

            const user = await User.findOne({username});

            if(user){
                return res.status(400).json({error:"Username already exists"})
            }

            //hashing the password//
            const passsalt = await bcryptjs.genSalt(10); // higher the value more secure it is and more slower it is
            const hashpass = await bcryptjs.hash(password , passsalt);



            
            const ladkekiphoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
            const ladkikiphoto = `https://avatar.iran.liara.run/public/girl?username=${username}`

            const newUser = new User({
                fullName,
                username,
                password:hashpass, // instead of saving password, we are saving hashpassword
                gender,
                profilePic: gender === 'male' ? ladkekiphoto : ladkikiphoto
            })

            if (newUser) {
                // generate JWT token
            tokenandcookie( newUser._id, res);    
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser._fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
            })
            }else{
                res.status(400).json({error:"invalid user data "});
            }

        } catch (error) {
            console.log("error in signup controller:" , error.message);
            res.status(500).json({error:"INteRNal SeRvEr eRrOr in signup"})
            
        
    }
}
//login
export const login= async (req , res ) => {
    console.log("connected to login");
    
    try {
     const {username , password } =req.body;
     const user = await User.findOne({username});
     const isPasswordCorrect = await bcryptjs.compare(password , user?.password || "" );

     if(!user || !isPasswordCorrect){
        return res.status(400).json({error: "Invalid username or password"})
     }

     tokenandcookie(user._id , res);
     res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic:user.profilePic
     })
        
    } catch (error) {
        console.log("error in login controller:" , error.message);
        res.status(500).json({error:"INteRNal SeRvEr eRrOr in login"})
    }
}
//logout
export const logout = (req, res) => {
    console.log("logout working");
    
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};