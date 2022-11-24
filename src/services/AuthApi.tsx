/// <reference types="vite/client" />
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ImportMetaEnv {
  readonly VITE_BACKEND_BASE_URL: string
}

const backendBaseUrl:ImportMetaEnv["VITE_BACKEND_BASE_URL"]= import.meta.env.VITE_BACKEND_BASE_URL;

const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: backendBaseUrl
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    verifyToken: builder.mutation({
      query: (payload) => ({
        url: '/verify-user-token',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: '/login',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: '/register',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});
export const { useLoginMutation, useVerifyTokenMutation, useRegisterMutation } = AuthApi;

export default AuthApi;
