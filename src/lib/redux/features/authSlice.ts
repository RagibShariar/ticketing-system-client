import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUser = {
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type TUserInfo = {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  designation: string;
  role: string;
};

type TInitialState = {
  token: string | null;
  user: TUser | null;
  userInfo: TUserInfo | null;
};

const initialState: TInitialState = {
  token: null,
  user: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, userInfo } = action.payload;
      state.user = user;
      state.token = token;
      state.userInfo = userInfo;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
export const userRole = (state: RootState) => state.auth.user?.role;
export const userInfo = (state: RootState) => state.auth.userInfo;
