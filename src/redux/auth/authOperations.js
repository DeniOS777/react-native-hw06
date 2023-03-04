import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
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
      console.log('redux-signin', user.email);
      console.log('redux-signup', user.uid);
    } catch (error) {
      console.log('catch-signin', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  'auth/signout',
  async (arg, thunkAPI) => {
    try {
    } catch (error) {
      console.log('catch', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const authSignUpUser = createAsyncThunk(
//   'auth/signup',
//   async ({ login, email, password }, thunkAPI) => {
//     try {
//       const { user } = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log('redux-signup', user.email);
//       console.log('redux-signup', user.uid);
//       return user.uid;
//     } catch (error) {
//       console.log('catch-signup', error.message);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
