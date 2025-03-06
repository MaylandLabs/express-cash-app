import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  logInAsync,
  getUserAsync,
  verifySessionAsync,
  logOutAsync,
  registerInAsync,
  googleSignIn,
  forgetPassword,
  forgetPasswordCode,
} from '../actions/auth';

const initialState: AuthSliceState = {
  isAuth: false,
  isLoading: true,
  user: null,
  passwordToken: {
    token: '',
    code: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(logInAsync.fulfilled, state => {
        state.isAuth = true;
      })
      .addCase(logInAsync.rejected, state => {
        state.isAuth = false;
      })
      .addCase(registerInAsync.fulfilled, state => {
        state.isAuth = true;
      })
      .addCase(registerInAsync.rejected, state => {
        state.isAuth = false;
      })
      .addCase(googleSignIn.fulfilled, state => {
        state.isAuth = true;
      })
      .addCase(googleSignIn.rejected, state => {
        state.isAuth = false;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = { ...action.payload.user };
      })
      .addCase(getUserAsync.rejected, state => {
        state.isAuth = false;
      })
      .addCase(verifySessionAsync.fulfilled, state => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(verifySessionAsync.rejected, state => {
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(logOutAsync.fulfilled, state => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(logOutAsync.rejected, state => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.passwordToken.token = action.payload;
      })
      .addCase(forgetPasswordCode.fulfilled, (state, action) => {
        state.passwordToken.code = action.payload;
      })
  },
});
export default authSlice.reducer;

export interface INotice {
  id: number;
  title: string;
  description: string;
  url: string;
  date: string;
}

export interface IBanner {
  id: number;
  url: string;
  redirect: string;
}

export interface AuthSliceState {
  isAuth: boolean;
  isLoading: boolean;
  user: IUser | null;
  passwordToken: {
    token: string;
    code: string;
  };
}


export interface IUser {
  id: number;
  cuil: string;
  birthday: string;
  first_name: string;
  phone: string;
  last_name: string;
  address: string | null;
  email: string;
  avatar: string;
  role: string;
  email_verified: boolean;
  cuponizate: boolean;
  points: number;
  isBlocked: boolean;
}
