// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  // userType: null,
  // other properties...
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
console.log("act", action)
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
//     setUserType: (state, action) => {
// console.log("useract", state, action)

//       state.userType = action.payload;
//     },
    // other actions...
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
// export const selectUser = (state) => state.user.user;

export default authSlice.reducer;
