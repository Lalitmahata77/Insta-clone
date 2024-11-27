import React from 'react'
import Post from './Post'

import {useGetAllPostsQuery} from "../redux/api/postApiSlice"
// import { useSelector } from 'react-redux'

const Posts = () => {
const {data} = useGetAllPostsQuery()
  // const {posts} = useSelector()
  console.log(data);
  
  return (
    <div>
        {
           data?.posts?.map((post) => <Post key={post._id} post={post}/>)
        }
    </div>
  )
}

export default Posts