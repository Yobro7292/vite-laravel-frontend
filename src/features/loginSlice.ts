import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authTokenKey } from "../routes";

export interface LoginState {
  isLogin: boolean;
  token: string;
}

const initialState: LoginState = {
  isLogin: false,
  token: ''
};

export const LoginSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {
    setIsLogin: (state, { payload }: PayloadAction<boolean>) => {
      state.isLogin = payload;
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
      localStorage.setItem(authTokenKey, payload);
    },
    removeToken: (state)=>{
      state.token = '';
      localStorage.removeItem(authTokenKey);
      state.isLogin=false;
    }
  },
});

export const { setIsLogin, setToken, removeToken } = LoginSlice.actions;

export default LoginSlice;
