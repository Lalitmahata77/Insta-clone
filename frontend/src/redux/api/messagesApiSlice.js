import { MESSAGE_URL } from "../contraints"
import { apiSlice } from "./apiSlice"

const messageApiSlice = apiSlice.injectEndpoints({
endpoints : (builder)=>({
    sendMessage : builder.mutation({
        query : ({data,id})=>({
            url : `${MESSAGE_URL}/send/${id}`,
            method : "POST",
            body : data
        })
    }),
    getMessage : builder.query({
        query :(id)=>({
            url : `${MESSAGE_URL}/all/${id}`,

        })
    })
})
})

export const {useSendMessageMutation,useGetMessageQuery} = messageApiSlice