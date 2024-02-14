import { AggregatedUpdateUserInfo } from '@ocmi/frontend/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '../../utils';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, ...user }: AggregatedUpdateUserInfo) => ({
        headers: getHeaders(),
        url: `/users/${id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useUpdateUserMutation } = usersApi;
