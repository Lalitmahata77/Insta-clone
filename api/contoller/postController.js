import asyncHandler from "../middleware/asyncHandler.js";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import path from "path";
import Comment from "../models/comments.js";




export const addNewPost = asyncHandler(async(req,res,next)=>{
    try {
        const {caption} = req.body;
        const image = req.file;
        const authorId= req.user._id;
        if(!image){
            res.status(400)
            throw new Error("Image required")
        }
        //image upload
        const optimizedImageBuffer = await sharp(image.buffer)
        .resize({width: 800, height: 800, fit: "inside"})
        .toFormat("jpeg", {quality: 80})
        .toBuffer();

        //buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image : cloudResponse.secure_url,
            author : authorId
        })
        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id)
            await user.save()
        }
        await post.populate({path : "author", select : "-password"})
        res.status(201).json({message : "New post added",post})
        
    } catch (error) {
        console.log(error);
        
    }
})

export const getAllPost = asyncHandler(async(req,res,next)=>{
    try {
        await Comment.find({})
        const posts = await Post.find().sort({createdAt: -1})
        .populate({path: "author", select: "username profilePicture"})
        .populate({
            path: "comments",
            sort : {createdAt: -1},
            populate: {
                path: "author",
                select: "username profilePicture"
            }
        })
        res.status(200).json({posts, success : true})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server error"})
        
    }
})

export const getUserPost = asyncHandler(async(req,res,next)=>{
    try {
        const authorId = req.user._id;
        const posts = await Post.find({author: authorId}).sort({createdAt: -1}).populate({path: "author", select: "username profilePicture"})
        .populate({path : "comments",
            sort: {createdAt: -1},
            populate: {
                path: "author",
                select: "username, profilePicture"
            }
        })
        res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server error"})
        
    }
})

export const likePost = asyncHandler(async(req,res,next)=>{
    try {
        const likegardebalo = req.user._id;
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({message: "Post not found", success:false})
            //like logic started
        await post.updateOne({$addToSet: {likes:likegardebalo}});
        await post.save();

        // //implement socket io for real time notification
        // const user = await User.findById(likegardebalo).select("username profilePicture")
        // const postOwnerId = post.author.toString();
        // if (postOwnerId !== likegardebalo) {
        //      // emit a notification event
        //      const notification = {
        //         type:"like",
        //         userId:likegardebalo,
        //         userDetails:user,
        //         postId,
        //         message: "Your post was liked"
        //      }
             
        // }
        res.status(200).json({message : "Post liked", success:true})
    } catch (error) {
        console.log(error);
        
    }
})



export const dislikePost = asyncHandler(async(req,res,next)=>{
    try {
        const likegardebalo = req.user._id;
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({message: "Post not found", success:false})
            //like logic started
        await post.updateOne({$pull: {likes:likegardebalo}});
        await post.save();

        // //implement socket io for real time notification
        // const user = await User.findById(likegardebalo).select("username profilePicture")
        // const postOwnerId = post.author.toString();
        // if (postOwnerId !== likegardebalo) {
        //      // emit a notification event
        //      const notification = {
        //         type:"like",
        //         userId:likegardebalo,
        //         userDetails:user,
        //         postId,
        //         message: "Your post was liked"
        //      }
             
        // }
        res.status(200).json({message : "Post liked", success:true})
    } catch (error) {
        console.log(error);
        
    }
})


export const addComment = asyncHandler(async(req,res,next)=>{
  try {
      const postId = req.params.id;
      const commentId = req.user._id;
      const{text}=req.body;
      const post = await Post.findById(postId)
      if(!text) return res.status(400).json({message:"Text is required", success:true})
          const comment = await Comment.create({
        text,
    author:commentId,
post:postId})
await comment.populate({path:"author", select:"username profilePicture"})
post.comments.push(comment._id)
await post.save()
res.status(201).json({message:"Comment Added",comment,success:true})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"})
    
  }
})

export const getCommentsOfPost = asyncHandler(async(req,res,next)=>{
    try {
        const postId = req.params.id;
        const comments = await Comment.find({post:postId}).populate("author","username profilePicture")
        if(!comments) return res.status(404).json({message : "No comments found for this post"})
            res.status(200).json({success:true,comments})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        
    }
})

export const deletePost = asyncHandler(async(req,res,next)=>{
    try {
        const postId = req.params.id;
        const authorId = req.user._id;
        const post = await Post.findById(postId)
        if(!post) return res.status(400).json({message:"Post not found"})
          
            //check if the logged in user is the owner of the post
            if(post.author._id.toString() !== authorId) return res.status(403).json({message:"Unauthorised"})
                //delete post
            await Post.findByIdAndDelete(postId)
            //remove the post id from the user's post
            let user = await User.findById(authorId)
            user.posts = user.posts.filter((id)=>id.toString() !== postId)
            await user.save()
            //delete associated comments
            await Comment.deleteMany({post:postId})
            res.status(200).json({message:"Post deleted", success:true})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        

    }
})


export const bookmarkPost = asyncHandler(async(req,res,next)=>{
    try {
        const postId = req.params.id;
        const authorId = req.user._id;
        const post = await Post.findById(postId);
        if(!post) return res.status(400).json({message:"Post not found"})
            const user = await User.findById(authorId)
        if (user.bookmarks.includes(post._id)) {
            //already bookmarked->remove from the bookmark
            await user.updateOne({$pull:{bookmarks:post._id}})
            await user.save()
            return res.status(200).json({type:'unsaved', message:'Post removed from bookmark', success:true});

        }else{
  // bookmark krna pdega
  await user.updateOne({$addToSet:{bookmarks:post._id}});
  await user.save();
  return res.status(200).json({type:'saved', message:'Post bookmarked', success:true});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        
    }
})

