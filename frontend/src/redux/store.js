import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "./feature/auth/authSlice"
import postReducer from "./feature/post/postSlice"
import chatReducer from "./feature/chat/chatSlice"
import soketReducer from "./feature/soket/soketSlice"
const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authReducer,
        post : postReducer,
        chat : chatReducer,
        socketio : soketReducer,
    },
    middleware :(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true

})
setupListeners(store.dispatch)
export default store