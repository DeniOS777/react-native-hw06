import { createSlice } from '@reduxjs/toolkit';
import { authSignUpUser } from './authOperations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    login: null,
    isLogedIn: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authSignUpUser.fulfilled, (state, { payload }) => {
      state.userId = payload.userId;
      state.login = payload.login;
    });
  },
});
