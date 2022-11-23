import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authTokenKey } from "../routes";

export interface LoginState {
  isLogin: boolean;
  token: string;
  user: null | {
    id: number;
    name: string;
    email:string;
    email_verified_at: null | string;
    created_at: string;
    updated_at: string;
  }
}

const initialState: LoginState = {
  isLogin: false,
  token: '',
  user: null
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
    setUser: (state, { payload }: PayloadAction<LoginState['user']>) => {
      state.user = payload;
    },
    removeToken: (state)=>{
      state.token = '';
      localStorage.removeItem(authTokenKey);
      state.isLogin=false;
      state.user= null;
    }
  },
});

export const { setIsLogin, setToken, removeToken, setUser } = LoginSlice.actions;

export default LoginSlice;
