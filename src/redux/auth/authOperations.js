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
      const dataToWrite = {
        login: user.displayName,
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
        const dataToUpdate = {
          login: user.displayName,
          userId: user.uid,
        };
        thunkAPI.dispatch(authRefreshUser(dataToUpdate));
      });
    } catch (error) {
      console.log(error.message);
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

// export const authChangeStateUser = createAsyncThunk(
//   'auth/changeStateUser',
//   async (_, thunkAPI) => {
//     try {
//       let currentUser = null;
//       await onAuthStateChanged(auth, user => {
//         if (user) {
//           currentUser = user;
//         }
//       });
//       const dataToUpdate = {
//         login: currentUser.displayName,
//         userId: currentUser.uid,
//       };
//       return dataToUpdate;
//     } catch (error) {
//       console.log(error.message);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
