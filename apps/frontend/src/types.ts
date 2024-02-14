import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type CustomFetchBaseQueryError = FetchBaseQueryError & {
  data: { message: string };
};

export type User = {
  name: string;
  email: string;
  isAdmin: boolean;
  id: number;
};

export type Employee = {
  id: number;
  name: string;
  rate: number;
  paymentType: string;
};

export type Pagination = {
  offset: number;
  limit: number;
};

export type AggregatedUpdateUserInfo = Omit<User, 'isAdmin'> & {
  newPassword?: string;
  currentPassword?: string;
};
