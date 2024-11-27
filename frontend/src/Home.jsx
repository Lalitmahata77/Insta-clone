import React from 'react'
import Feed from './components/feed'
import {useGetAllPostsQuery} from "./redux/api/postApiSlice"
import RightSidebar from './components/RightSIdebar'
import { useSelector } from 'react-redux'



const Home = () => {
  const {userInfo} = useSelector((state)=>state.auth)


  return (
    <>
   <div className=' flex  justify-between'>
   <Feed/>
   {
    userInfo ? (<RightSidebar/>) : (<></>)
   }
   
  
  </div>
   </>
  )
}

export default Home