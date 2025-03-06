import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authSlice from "./reducers/auth";

const reducer = combineReducers({
  auth: authSlice,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
