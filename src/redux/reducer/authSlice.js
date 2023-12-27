// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  // other properties...
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      // state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      // state.user = null;
    },
    // other actions...
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.user.user;

export default authSlice.reducer;
