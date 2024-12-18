import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
    suggestedUsers:[],
    selectedUser:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
    setSuggestedUsers:(state,action) => {
      state.suggestedUsers = action.payload;
  },
  setAuthUser:(state,action) => {
    state.user = action.payload;
},
SetSelectedUser:(state,action)=>{
  state.selectedUser = action.payload
}
  },
});

export const { setCredentials, logout, setSuggestedUsers,setAuthUser,SetSelectedUser } = authSlice.actions;

export default authSlice.reducer;