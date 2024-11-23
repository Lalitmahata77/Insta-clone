import { USER_URL } from "../contraints";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        register : builder.mutation({
            query :(data)=>({
                url : `${USER_URL}`,
                method : "POST",
                body : data
            })
        }),
        login : builder.mutation({
            query : (data)=>({
                url : `${USER_URL}/login`,
                method : "Post",
                body : data
            })
        }),
        logout : builder.mutation({
            query : ()=>({
                url : `${USER_URL}/logout`,
                method : "POST"
            })
        }),
        suggestedUsers : builder.query({
            query : ()=>({
                url : `${USER_URL}`
            })
        }),
        followOrUnfolloow : builder.mutation({
            query : (id)=>({
                url : `${USER_URL}/followOrUnfollow/${id}`,
                method : "POST"
            })
        }),
        getProfile : builder.query({
            query : (id)=>({
                url : `${USER_URL}/${id}`
            })
        }),
        editProfile : builder.mutation({
            query : ({data,id})=>({
                url : `${USER_URL}/edit/${id}`,
                method : "PUT",
                body : data
            })
        })
    }),
    
})

export const {useRegisterMutation,useLoginMutation,useLogoutMutation,useFollowOrUnfolloowMutation,useEditProfileMutation,useGetProfileQuery,useSuggestedUsersQuery} = userApiSlice
