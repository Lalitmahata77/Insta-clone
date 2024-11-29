import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useSuggestedUsersQuery} from '../redux/api/userApiSlice'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { SetSelectedUser } from '../redux/feature/auth/authSlice'
import {setMessages} from "../redux/feature/chat/chatSlice"
import { MessageCircleCode } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input';
import Messages from './Messages'
const ChatPage = () => {
    const {data} = useSuggestedUsersQuery()
    const {userInfo,selectedUser} = useSelector((state)=>state.auth)
    console.log(data);
    
    const { onlineUsers, messages } = useSelector((state) => state.chat);
    const [textMessage, setTextMessage] = useState("");
   
    const dispatch = useDispatch()
  return (
    <div className=' flex ml-[16%] h-screen'>
        <selection className="">
<h1 className=' font-bold mb-4 px-3 text-xl'>{userInfo?.username}</h1>
<hr className=' mb-4 border-x-gray-300'/>
<div className=' overflow-y-auto h-[80vh]'>
    {
        data?.users?.map((suggestedUser)=>
        {
           
            const isOnline = onlineUsers.includes(suggestedUser?._id);
           return (
                <div key={suggestedUser._id} onClick={()=>dispatch(SetSelectedUser(suggestedUser))} className=' flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
                    <Avatar className="w-14 h-14">
                        <AvatarImage src={suggestedUser?.profilePicture}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className=' flex flex-col'>
                        <span className=' font-medium'>{suggestedUser?.username}</span>
                        <span className={` text-xs font-bold ${isOnline ? "text-green-600" : "text-red-600"}`}>{isOnline ? 'online' : 'offline'}</span>
                    </div>

                </div>
            )
        }
        )
    }
</div>
        </selection>

        {
                selectedUser ? (
                    <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
                        <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                            <Avatar>
                                <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span>{selectedUser?.username}</span>
                            </div>
                        </div>
                        <Messages selectedUser={selectedUser} />
                        <div className='flex items-center p-4 border-t border-t-gray-300'>
                            <Input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" className='flex-1 mr-2 focus-visible:ring-transparent' placeholder="Messages..." />
                            {/* <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button> */}
                        </div>
                    </section>
                ) : (
                    <div className='flex flex-col items-center justify-center mx-auto'>
                        <MessageCircleCode className='w-32 h-32 my-4' />
                        <h1 className='font-medium'>Your messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            }
    </div>
  )
}

export default ChatPage