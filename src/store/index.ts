import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './message';
import usersReducer from './users';
import { colorsApi } from './colors';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    users: usersReducer,
    [colorsApi.reducerPath]: colorsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(colorsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
