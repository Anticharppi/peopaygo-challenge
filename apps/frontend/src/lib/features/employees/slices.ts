import { Employee, Pagination } from '@ocmi/frontend/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeaders } from '../../utils';

type InitialState = {
  employees: Employee[];
};

const initialState: InitialState = {
  employees: [],
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployeesReducer: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    mergeEmployeesReducer: (state, action: PayloadAction<Employee[]>) => {
      state.employees = [...state.employees, ...action.payload];
    },
    addEmployeeReducer: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    updateEmployeeReducer: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id,
      );
      state.employees[index] = action.payload;
    },
    removeEmployeeReducer: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload,
      );
    },
  },
});

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/employees`,
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], Pagination>({
      query: (pagination) => ({
        headers: getHeaders(),
        url: `?offset=${pagination.offset}&limit=${pagination.limit}`,
      }),
    }),
    addEmployee: builder.mutation<Employee, Omit<Employee, 'id' | 'userId'>>({
      query: (employee) => ({
        url: '',
        headers: getHeaders(),
        method: 'POST',
        body: employee,
      }),
    }),
    updateEmployee: builder.mutation<Employee, Employee>({
      query: ({ id, ...employee }) => ({
        url: `/${id}`,
        headers: getHeaders(),
        method: 'PATCH',
        body: employee,
      }),
    }),
    removeEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        headers: getHeaders(),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  addEmployeeReducer,
  removeEmployeeReducer,
  mergeEmployeesReducer,
  updateEmployeeReducer,
  setEmployeesReducer,
} = employeesSlice.actions;

export const {
  useAddEmployeeMutation,
  useGetEmployeesQuery,
  useRemoveEmployeeMutation,
  useUpdateEmployeeMutation,
  useLazyGetEmployeesQuery,
} = employeesApi;
