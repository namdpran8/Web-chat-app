import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        enum:["male" , "female"]
    },
    profilePic:{
        type:String,
        default:""
    }
} , {timestamps : true}); //created at , updated at

const User = mongoose.model("User" , userScheme);

export default User;