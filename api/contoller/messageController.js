import asyncHandler from "../middleware/asyncHandler.js";
import Conversation from "../models/conversation.js";
import Message from "../models/messageModel.js";



export const sendMessage = asyncHandler(async(req,res,next)=>{
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const {textMessage:message} = req.body;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        //establish the conversation if not started yet
        if (!conversation) {
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })
        if(newMessage) conversation.messages.push(newMessage._id)
            await Promise.all([conversation.save(),newMessage.save()])

        res.status(201).json({
            success:true,
            newMessage
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        
    }
})


export const getMessage = asyncHandler(async(req,res,next)=>{
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants:{$all: [senderId,receiverId]}
        }).populate("messages")
        if(!conversation) return res.status(200).json({success:true,message:[]})
            res.status(200).json({success:true,message:conversation?.messages})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        
    }
})