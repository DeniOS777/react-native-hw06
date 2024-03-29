import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
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
  async ({ userPhoto, login, email, password }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: login, photoURL: userPhoto });
      const { photoURL, displayName, email: userEmail, uid } = auth.currentUser;
      const dataToUpdate = {
        avatar: photoURL,
        login: displayName,
        email: userEmail,
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
      const dataToWrite = {
        avatar: user.photoURL,
        login: user.displayName,
        email: user.email,
        userId: user.uid,
      };
      return dataToWrite;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authRefreshUser = createAction('auth/refreshUser');

export const authChangeStateUser = createAsyncThunk(
  'auth/changeStateUser',
  async (_, thunkAPI) => {
    try {
      onAuthStateChanged(auth, user => {
        if (user) {
          const dataToUpdate = {
            avatar: user.photoURL,
            login: user.displayName,
            email: user.email,
            userId: user.uid,
          };
          thunkAPI.dispatch(authRefreshUser(dataToUpdate));
        }
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  'auth/signout',
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
