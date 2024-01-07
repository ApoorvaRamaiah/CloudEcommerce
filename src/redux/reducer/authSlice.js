import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userType: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("login", action)
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state, action) => {

      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
