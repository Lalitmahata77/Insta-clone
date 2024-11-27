import { POST_URL } from "../contraints";
import { apiSlice } from "./apiSlice";


const postApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        createPost : builder.mutation({
            query : (data)=>({
                url : `${POST_URL}/createpost`,
                method : "POST",
                body : data
            })
        }),
        getAllPosts : builder.query({
            query : ()=>({
                url : `${POST_URL}/getAllPost`
            })
        }),
        getUserPost : builder.query({
            query : ()=>({
                url : `${POST_URL}/userpost/all`
            })
        }),
        addCommennts : builder.mutation({
            query : (data)=>({
                url : `${POST_URL}/${data.postId}/addcomment`,
                method : "POST",
                body : data
            })
        }),
        getAllCommentsOfPost : builder.query({
            query : (id)=>({
                url : `${POST_URL}/${id}/comment/all`
            })
        }),
        likePost : builder.mutation({
            query : (id)=>({
                url : `${POST_URL}/${id}/like`,
                method : "POST"
            })
        }),
        disLikePost : builder.mutation({
            query : (id)=>({
                url : `${POST_URL}/${id}/dislike`,
                method : "POST"
            })
        }),
        deletePost : builder.mutation({
            query : (id)=>({
                url : `${POST_URL}/delete/${id}`,
                method : "DELETE"
            })
        }),
        bookmark : builder.query({
            query : (id)=>({
                url : `${POST_URL}/${id}/bookmark`
            })
        })
    })
})

export const {useCreatePostMutation,useAddCommenntsMutation,useBookmarkQuery,useDeletePostMutation,useGetAllCommentsOfPostQuery,useGetAllPostsQuery,useGetUserPostQuery,useLikePostMutation,useDisLikePostMutation} = postApiSlice