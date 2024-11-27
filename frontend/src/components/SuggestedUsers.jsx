import React from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {useSuggestedUsersQuery} from "../redux/api/userApiSlice"

const SuggestedUsers = () => {
    // const { suggestedUsers } = useSelector((state) => state.auth);
    

    const {data } = useSuggestedUsersQuery()
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <br />
                <span className='font-medium cursor-pointer ml2'>See All</span>
            </div>
            {
                data?.users.map((suggestedUser)=>(
                 
                        <div key={suggestedUser?._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${suggestedUser?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={suggestedUser?.profilePicture} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${suggestedUser?._id}`}>{suggestedUser?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{suggestedUser?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span>
                        </div>
                    
                ))
            }

        </div>
    )
}

export default SuggestedUsers