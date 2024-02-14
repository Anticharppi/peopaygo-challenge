import { User } from '@ocmi/frontend/types';
import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type SignInCredentials = {
  email: string;
  password: string;
};

type InitialState = {
  user: User | null;
  isAuthenticated: boolean;
};

const user = JSON.parse(localStorage.getItem('user') as string) || null;

const initialState: InitialState = {
  user: user,
  isAuthenticated: !!user,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInReducer: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signOutReducer: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials: SignInCredentials) => ({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/sign-in`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useSignInMutation } = authApi;
export const { signInReducer, signOutReducer } = authSlice.actions;
