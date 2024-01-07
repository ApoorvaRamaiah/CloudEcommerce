import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   // other properties...
// };

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    user:null
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { ulogin, ulogout } = userSlice.actions;
// export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
