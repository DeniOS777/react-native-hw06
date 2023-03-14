import { createSlice } from '@reduxjs/toolkit';
import {
  authSignUpUser,
  authSignInUser,
  authRefreshUser,
  authSignOutUser,
} from './authOperations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    login: null,
    email: null,
    avatar: null,
    isLoading: false,
    isLogedIn: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authSignUpUser.pending, state => {
        // state.isLoading = true;
      })
      .addCase(authSignUpUser.fulfilled, (state, { payload }) => {
        state.userId = payload.userId;
        state.login = payload.login;
        state.email = payload.email;
        state.avatar = payload.avatar;
        state.isLogedIn = true;
        // state.isLoading = false;
      })
      .addCase(authSignInUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(authSignInUser.fulfilled, (state, { payload }) => {
        state.userId = payload.userId;
        state.login = payload.login;
        state.email = payload.email;
        state.avatar = payload.avatar;
        state.isLogedIn = true;
        state.isLoading = false;
      })
      .addCase(authRefreshUser, (state, { payload }) => {
        state.userId = payload.userId;
        state.login = payload.login;
        state.email = payload.email;
        state.avatar = payload.avatar;
        state.isLogedIn = true;
      })
      .addCase(authSignOutUser.fulfilled, state => {
        state.avatar = null;
        state.userId = null;
        state.login = null;
        state.email = null;
        state.isLogedIn = false;
      });
  },
});
