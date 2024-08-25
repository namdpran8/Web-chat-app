import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
//connecting to db
import connectoMongoDB from "./db/connectomangodb.js";
//import Routes
import authRoutes from "./routes/authroutes.js";
import messageroutes from "./routes/messageroutes.js";
import userRoutes from './routes/userRoutes.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000

app.use(express.json()); 
app.use(cookieParser());

app.get("/" , (req , res )=>{
    res.send("working")
})


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageroutes);
app.use("/api/user", userRoutes);

app.listen( PORT , ()=> {
    connectoMongoDB ();
    console.log(`Running at Port ${PORT}`)
});