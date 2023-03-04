import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { auth } from '../../firebase/config';

export const authSignUpUser = createAsyncThunk(
  'auth/signup',
  async ({ login, email, password }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: login });
      const { displayName, uid } = auth.currentUser;
      const dataToUpdate = {
        login: displayName,
        userId: uid,
      };
      return dataToUpdate;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authChangeStateUser = createAsyncThunk(
  'auth/changeStateUser',
  async (_, thunkAPI) => {
    try {
      let currentUser = null;
      await onAuthStateChanged(auth, user => {
        if (!user) return;
        currentUser = user;
      });
      const dataToUpdate = {
        login: currentUser.displayName,
        userId: currentUser.uid,
      };
      return dataToUpdate;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  'auth/signout',
  async (arg, thunkAPI) => {
    try {
      await signOut();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
