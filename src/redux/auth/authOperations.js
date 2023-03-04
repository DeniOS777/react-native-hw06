import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../../firebase/config';

export const authSignUpUser = createAsyncThunk(
  'auth/signup',
  async ({ login, email, password }, thunkAPI) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('redux-signup', user);
    } catch (error) {
      console.log('catch', error.message);
    }
  }
);

export const authSignInUser = createAsyncThunk(
  'auth/signin',
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('redux-signin', user);
    } catch (error) {
      console.log('catch', error.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  'auth/signout',
  async (arg, thunkAPI) => {
    try {
    } catch (error) {
      console.log('catch', error.message);
    }
  }
);
