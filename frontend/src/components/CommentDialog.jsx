import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const CommentDialog = ({open, setOpen}) => {
    const[text,setText] = useState("")
    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
          setText(inputText);
        } else {
          setText("");
        }
      }

      const sendMessageHandler = async()=>{
        alert("hi")
      }
  return (
    <Dialog open={open}>
        <DialogContent onInteractOutside={()=>setOpen(false)}>
            <div className=' flex flex-1'> 

            <div className=' w-1/2'>

        <img className=' rounded-sm my-2 w-full aspect-square object-cover' src='https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' alt='post_img'/>
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
                        <Link className=' font-semibold text-xs'>username</Link>
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
                comments
            </div>
<div className=' p-4'>
    <div className=' flex items-center gap-2'>
        <input type='text' placeholder='Add a comment.....' className=' w-full outline-none border border-gray-300 p-2 rounded' value={text} onChange={changeEventHandler}/>
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