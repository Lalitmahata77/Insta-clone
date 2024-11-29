import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import useGetAllMessage from '@/hooks/useGetAllMessage'
// import useGetRTM from '@/hooks/useGetRTM'
import {useGetMessageQuery} from "../redux/api/messagesApiSlice"
const Messages = ({ selectedUser }) => {
    // useGetRTM();
    // useGetAllMessage();
   
    const{data} = useGetMessageQuery(selectedUser?._id)
    console.log(data);
    
    const {messages} = useSelector(store=>store.chat);
    const {userInfo} = useSelector((state)=>state.auth);
    return (    
        <div className='overflow-y-auto flex-1 p-4'>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}><Button className="h-8 my-2" variant="secondary">View profile</Button></Link>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                {
                   messages && data?.message.map((msg) => {
                        return (
                            <div key={msg._id} className={`flex ${msg.senderId === userInfo?._id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 rounded-lg max-w-xs break-words ${msg.senderId === userInfo?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    {msg.message}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>  
    )
}

export default Messages