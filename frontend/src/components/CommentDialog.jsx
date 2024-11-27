import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import { setPosts } from '../redux/feature/post/postSlice'
import { toast } from 'sonner'
import {useAddCommenntsMutation,useGetAllPostsQuery} from "../redux/api/postApiSlice"
const CommentDialog = ({open, setOpen}) => {
    const[text,setText] = useState("")
    const { selectedPost, posts } = useSelector((state) => state.post);
const {refetch} = useGetAllPostsQuery()
const [commentData] = useAddCommenntsMutation()
    const [comment, setComment] = useState([]);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (selectedPost) {
        setComment(selectedPost.comments);
      }
    }, [selectedPost]);
    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
          setText(inputText);
        } else {
          setText("");
        }
      }

      const sendMessageHandler = async()=>{
        try {
            const res = await commentData({postId : selectedPost._id,text}).unwrap()
            console.log(res);
            
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success("comment added");
                setText("")
                refetch
            }
        } catch (error) {
            console.log(error);
            toast.error(error.data.message)
            
        }
    }
  return (
    <Dialog open={open}>
        <DialogContent onInteractOutside={()=>setOpen(false)}>
            <div className=' flex flex-1'> 

            <div className=' w-1/2'>

        <img className=' rounded-sm my-2 w-full aspect-square object-cover' src={selectedPost?.image} alt='post_img'/>
            </div>
            <div className=' w-1/2 flex flex-col justify-between'>
            <div className=' flex items-center justify-between'>
                <div className=' flex gap-3 items-center'>
                    <Link>
<Avatar>
    <AvatarImage src=""/>
    <AvatarFallback>CN</AvatarFallback>
</Avatar>
                    </Link>
                    <div>
                        <Link className=' font-semibold text-xs'>{selectedPost?.author?.username}</Link>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
<MoreHorizontal className=' cursor-pointer'/>
                    </DialogTrigger>
                    <DialogContent className=" flex flex-col items-center text-sm text-center">
                        <div className=' cursor-pointer w-full text-[#ED4956] font-bold'>Unfollow</div>
                        <div className=' cursor-pointer w-full'>
                            Add to favorites
                        </div>

                    </DialogContent>
                </Dialog>
            </div>
            <hr />
            <div className=' flex-1 overflow-y-auto max-h-96 p-4'>
                {comment.map((comment)=> <Comment key={comment._id} comment={comment}/>)}
            </div>
<div className=' p-4'>
    <div className=' flex items-center gap-2'>
        <input type='text' placeholder='Add a comment.....' className=' w-full outline-none text-sm border border-gray-300 p-2 rounded' value={text} onChange={changeEventHandler}/>
        <Button disabled={!text.trim()} onClick={sendMessageHandler} variant="outline">Send</Button>
    </div>

</div>
            </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default CommentDialog