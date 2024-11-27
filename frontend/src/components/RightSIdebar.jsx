import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);
 
  return (
    <div className='w-fit my-10 pr-32 p-10'>
      <div className='flex items-center gap-2'>
        <Link to={`/profile/${userInfo?._id}`}>
          <Avatar>
            <AvatarImage src={userInfo?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className='font-semibold text-sm'><Link to={`/profile/${userInfo?._id}`}>{userInfo?.username}</Link></h1>
          <span className='text-gray-600 text-sm'>{userInfo?.bio || 'Bio here...'}</span>
        </div>
      </div>
     

     
<SuggestedUsers/>
      
    </div>
  )
}

export default RightSidebar