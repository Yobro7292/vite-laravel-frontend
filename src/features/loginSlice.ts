import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  isLogin: boolean;
}

const initialState: LoginState = {
  isLogin: false,
};

export const LoginSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {
    checkIsLogin: (state, { payload }: PayloadAction<boolean>) => {
      state.isLogin = payload;
    },
  },
});

export const { checkIsLogin } = LoginSlice.actions;

export default LoginSlice;
