
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.jsx'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog.jsx'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button.jsx'
import { FaRegHeart } from 'react-icons/fa'
import CommentDialog from './CommentDialog.jsx'

const Post = () => {
    const[text,setText] = useState("")
    const[open, setOpen] = useState(false)
  return (
    <div className=' my-8 w-full max-w-sm mx-auto'>
         <div className='flex items-center justify-between'>
<div className=' flex items-center gap-2'>
<Avatar>
    <AvatarImage src="" alt="post_image"/>
   <AvatarFallback>CN</AvatarFallback>
</Avatar>
<h1>Username</h1>
</div>
<Dialog>
    <DialogTrigger asChild>
        <MoreHorizontal className=' cursor-pointer'/>
    </DialogTrigger>
    <DialogContent className=" flex flex-col items-center text-sm text-center">
        <Button variant="ghost" className=" cursor-pointer w-fit text-[#E04956] font-bold" >Unfollow</Button>
        <Button variant="ghost" className=" cursor-pointer w-fit " >Add to favorites</Button>
        <Button variant="ghost" className=" cursor-pointer w-fit " >Delete</Button>
    </DialogContent>
</Dialog>
    </div>
    <img className=' rounded-sm my-2 w-full aspect-square object-cover' src='https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' alt='post_img'/>
    <div>
        <div className=' flex items-center justify-between my-2'>
<div className=' flex items-center gap-3'>
<FaRegHeart size={22} className=' cursor-pointer hover:text-gray-600'/>
<MessageCircle onClick={()=>setOpen(true)} className=' cursor-pointer hover:text-gray-600'/>
<Send className=' cursor-pointer hover:text-gray-600'/>
</div>
<Bookmark className=' cursor-pointer hover:text-gray-600'/>
        </div>
        <span className=' font-medium block mb-2'>1k likes</span>

        <p>
            <span className=' font-medium mr-2'>Username</span>
            caption
        </p>
            <span onClick={()=>setOpen(true)} className=' cursor-pointer text-sm'>View all 10 comments</span>
            <CommentDialog  open={open} setOpen={setOpen}/>
            <div className=' flex items-center justify-between'>
                <input type="text" placeholder='Add a comment....'
                value={text}
                onChange={(e)=>setText(e.target.value)}
                className=' outline-none text-sm w-full' />
                {text && <span className=' text-[#3BA0F8]'>Post</span>}
                
                </div>
        
    </div>
    </div>
  )
}

export default Post