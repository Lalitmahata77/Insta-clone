
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.jsx'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog.jsx'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button.jsx'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import CommentDialog from './CommentDialog.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {useDeletePostMutation,useLikePostMutation,useDisLikePostMutation,useAddCommenntsMutation} from "../redux/api/postApiSlice.js"
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router'
import { setPosts, setSelectedPost } from '../redux/feature/post/postSlice.js'

const Post = ({post}) => {
    const {id: postId } = useParams();
    const[text,setText] = useState("")
    const[open, setOpen] = useState(false)
    const {userInfo} = useSelector((state)=>state.auth)
    const {posts} = useSelector((state)=>state.post)
    const [liked, setLiked] = useState(post.likes.includes(userInfo?._id) || false);
    const [postLike, setPostLike] = useState(post.likes.length);
    const [comment, setComment] = useState(post.comments);
const navigate = useNavigate()
const dispatch = useDispatch()
const [deletepost] = useDeletePostMutation()
const [like] =  useLikePostMutation()
const [dislike] = useDisLikePostMutation()
const[commentData] = useAddCommenntsMutation()
    const handledelete = async()=>{
        try {
          const {data} = await deletepost(post?._id)

toast.success("Post deleted")
navigate("/")
        } catch (error) {
            console.log(error);
            toast.error(error.data.message)
            
        }
    }
    const likePost = async()=>{
        try {
            const res = await like(post?._id)
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                // apne post ko update krunga
                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== userInfo._id) : [...p.likes, userInfo._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.data.message)
            console.log(error);
            
        }
    }
    const dislikepost = async()=>{
        try {
            const res = await dislike(post?._id)
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                // apne post ko update krunga
                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== userInfo._id) : [...p.likes, userInfo._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.data.message)
            console.log(error);
            
        }
    }

    const addComments = async()=>{
        try {
            const res = await commentData({postId : post._id,text}).unwrap()
            console.log(res);
            
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText("");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.data.message)
            
        }
    }
  return (
    <div className=' my-8 w-full max-w-sm mx-auto'>
         <div className='flex items-center justify-between'>
<div className=' flex items-center gap-2'>
<Avatar>
    <AvatarImage src={post.author?.profilePicture} alt="post_image"/>
   <AvatarFallback>CN</AvatarFallback>
</Avatar>
<h1>{post?.author?.username}</h1>
</div>
<Dialog>
    <DialogTrigger asChild>
        <MoreHorizontal className=' cursor-pointer'/>
    </DialogTrigger>
    <DialogContent className=" flex flex-col items-center text-sm text-center">
        <Button variant="ghost" className=" cursor-pointer w-fit text-[#E04956] font-bold" >Unfollow</Button>
        <Button variant="ghost" className=" cursor-pointer w-fit " >Add to favorites</Button>
        {
userInfo && userInfo._id === post.author._id && ( <Button variant="ghost" className=" cursor-pointer w-fit " onClick={handledelete} >Delete</Button>)
        }

    </DialogContent>
</Dialog>
    </div>
    <img className=' rounded-sm my-2 w-full aspect-square object-cover' src={post?.image} alt='post_img'/>
    <div>
        <div className=' flex items-center justify-between my-2'>
<div className=' flex items-center gap-3'>
{
                        liked ? <FaHeart onClick={dislikepost} size={'24'} className='cursor-pointer text-red-600' /> : <FaRegHeart onClick={likePost} size={'22px'} className='cursor-pointer hover:text-gray-600' />
                    }
 <MessageCircle onClick={() => {
                        dispatch(setSelectedPost(post));
                        setOpen(true);
                    }} className='cursor-pointer hover:text-gray-600' />
<Send className=' cursor-pointer hover:text-gray-600'/>
</div>
<Bookmark className=' cursor-pointer hover:text-gray-600'/>
        </div>
        <span className=' font-medium block mb-2'>{postLike} likes</span>

        <p>
            <span className=' font-medium mr-2'>{post?.author?.username}</span>
            {post?.caption}
        </p>
        {
                comment.length > 0 && (
                    <span onClick={() => {
                        dispatch(setSelectedPost(post));
                        setOpen(true);
                    }} className='cursor-pointer text-sm text-gray-400'>View all {comment.length} comments</span>
                )
            }
            <CommentDialog  open={open} setOpen={setOpen}/>
            <div className=' flex items-center justify-between'>
                <input type="text" placeholder='Add a comment....'
                value={text}
                onChange={(e)=>setText(e.target.value)}
                className=' outline-none text-sm w-full' />
                {text && <span className=' text-[#3BA0F8] cursor-pointer' onClick={addComments}>Post</span>}
                
                </div>
        
    </div>
    </div>
  )
}

export default Post