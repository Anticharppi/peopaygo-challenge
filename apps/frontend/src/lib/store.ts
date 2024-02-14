import { configureStore } from '@reduxjs/toolkit';
import { authApi, authSlice } from './features/auth';
import { usersApi } from './features/users';
import { employeesApi, employeesSlice } from './features/employees';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      employees: employeesSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [employeesApi.reducerPath]: employeesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(usersApi.middleware)
        .concat(employeesApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
