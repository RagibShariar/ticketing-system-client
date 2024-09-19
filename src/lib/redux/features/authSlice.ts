import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUser = {
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TInitialState = {
  token: string | null;
  user: TUser | null;
};

const initialState: TInitialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
export const userRole = (state: RootState) => state.auth.user?.role;
