import React from 'react'
import Post from './Post'
// import { useSelector } from 'react-redux'

const Posts = () => {
//   const {posts} = useSelector((state)=>state.post);
  return (
    <div>
        {
            [1].map((post) => <Post key={post._id} post={post}/>)
        }
    </div>
  )
}

export default Posts