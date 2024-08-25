import express from "express";
import { getMessages, sendMessage } from "../controllers/messagecontroller.js";
import protectRoute from "../middleware/protectroute.js";

const router = express.Router();

router.post("/send/:id", protectRoute , sendMessage) 

router.get("/:id", protectRoute , getMessages )

export default router;

//protectroutes is middleware that checks weather the user is login or not