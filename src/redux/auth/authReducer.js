import { createSlice } from '@reduxjs/toolkit';
import {
  authSignUpUser,
  authSignInUser,
  authChangeStateUser,
  authRefreshUser,
  authSignOutUser,
} from './authOperations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    login: null,
    isLogedIn: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authSignUpUser.fulfilled, (state, { payload }) => {
        state.userId = payload.userId;
        state.login = payload.login;
        state.isLogedIn = true;
      })
      .addCase(authSignInUser.fulfilled, (state, { payload }) => {
        state.userId = payload.userId;
        state.login = payload.login;
        state.isLogedIn = true;
      })
      .addCase(authRefreshUser, (state, { payload }) => {
        console.log('payload', payload);
        state.userId = payload.userId;
        state.login = payload.login;
        state.isLogedIn = true;
      })
      .addCase(authSignOutUser.fulfilled, state => {
        state.userId = null;
        state.login = null;
        state.isLogedIn = false;
      });
  },
});
