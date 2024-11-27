import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import createToken from "../utils/createToken.js"
import Post from "../models/postModel.js";
import getDataUri from "../utils/datauri.js";
export const register = asyncHandler(async(req,res,next)=>{
    const {username,email,password} = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("Please fill all fields")
    }
    const user = await User.findOne({email})
    if (user) {
        res.status(400)
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new User({username,email, password : hashedPassword})
    try {
        await newUser.save()
        createToken(res,newUser._id)
        res.json({
            _id : newUser._id,
            username : newUser.username,
            email : newUser.email,
            password : newUser.password,
            profilePicture : newUser.profilePicture,
            bio : newUser.bio,
            gender : newUser.gender,
            followers : newUser.followers,
            following : newUser.following,
            posts : newUser.posts,
            bookmarks : newUser.bookmarks
        })

    } catch (error) {
        res.status(500).json({message : "Invalid data"})
    }
})

export const login = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if (user) {
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if (isPasswordValid) {
            createToken(res,user._id)
            res.status(200).json({
                _id : user._id,
                username : user.username,
                email : user.email,
                password : user.password,
                profilePicture : user.profilePicture,
                bio : user.bio,
                gender : user.gender,
                followers : user.followers,
                following : user.following,
                posts : user.posts,
                bookmarks : user.bookmarks
            })
            return
        }
    }
})

export const logout = asyncHandler(async(req,res,next)=>{
    res.cookie("jwt", "",{  httyOnly: true,
        expires: new Date(0),})
        res.status(200).json({message : "Logout successfully"})
})

export const getProfile = asyncHandler(async(req,res,next)=>{
   try {
    //  const {id} = req.params;
    //  await Post.find({})
     const user = await User.findById(req.user._id).populate({path:'posts', createdAt:-1}).populate('bookmarks');
     res.status(200).json(user)
   } catch (error) {
    console.log(error);
    res.status(500).json(error.message)
    
   }
    
})

export const editProfile = async (req, res) => {
    try {
        
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        };
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated.',
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
    }
};

export const getSuggestedUsers = asyncHandler(async (req, res) => {
    try {
        const suggestedUsers = await User.find({_id: {$ne : req.id}}).select("-password");
        if (!suggestedUsers) {
            return res.status(400).json({
                message: 'Currently do not have any users',
            })
        };
        return res.status(200).json({
            success: true,
            users: suggestedUsers
        })
    } catch (error) {
        console.log(error);
    }
});


export const followOrUnfollow = asyncHandler(async(req, res) => {
    try {
        const followgardebalo = req.user._id; // patel
        const jailaifollowgardehu = req.params.id; // shivani
        if (followgardebalo === jailaifollowgardehu) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await User.findById(followgardebalo);
        const targetUser = await User.findById(jailaifollowgardehu);
        
        
        

        if (!user || !targetUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        // mai check krunga ki follow krna hai ya unfollow
        const isFollowing = user.following.includes(jailaifollowgardehu);
        if (isFollowing) {
            // unfollow logic ayega
            await Promise.all([
                User.updateOne({ _id: followgardebalo }, { $pull: { following: jailaifollowgardehu } }),
                User.updateOne({ _id: jailaifollowgardehu }, { $pull: { followers: followgardebalo } }),
            ])
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // follow logic ayega
            await Promise.all([
                User.updateOne({ _id: followgardebalo }, { $push: { following: jailaifollowgardehu } }),
                User.updateOne({ _id: jailaifollowgardehu }, { $push: { followers: followgardebalo } }),
            ])
            return res.status(200).json({ message: 'followed successfully', success: true });
        }
    } catch (error) {
        console.log(error);
    }
})