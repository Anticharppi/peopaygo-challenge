import { User } from '@ocmi/frontend/types';
import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSafetyLocalStorage } from '../../utils';

type SignInCredentials = {
  email: string;
  password: string;
};

type InitialState = {
  user: User | null;
  isAuthenticated: boolean;
};

const user = getSafetyLocalStorage<User>('user', true);

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
    updateUserReducer: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials: SignInCredentials) => ({
        url: `/auth/sign-in`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useSignInMutation } = authApi;
export const { signInReducer, signOutReducer, updateUserReducer } =
  authSlice.actions;
