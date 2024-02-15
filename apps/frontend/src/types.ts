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

export type GetEmployeesResponse = {
  employees: Employee[];
  pagination: Pagination;
};

export type Pagination = {
  offset: number;
  limit: number;
  count?: number;
};

export type QueryParams = {
  pagination?: Pagination;
  name?: string;
};

export type AggregatedUpdateUserInfo = Omit<User, 'isAdmin'> & {
  newPassword?: string;
  currentPassword?: string;
};
