import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './message';
import usersReducer from './users';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    users: usersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
