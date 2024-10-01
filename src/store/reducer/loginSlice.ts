import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    loginUser(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.token = null;
      state.isAuthenticated = false;
    }
  },
});

export const { loginUser, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
