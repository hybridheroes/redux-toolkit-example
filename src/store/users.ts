import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '.';

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://reqres.in/api/users?delay=1');
  return (await response.json()).data as UserData[];
});

export const usersAdapter = createEntityAdapter<UserData>();

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
  }),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.loading = false;
    });
  },
});

const usersSelectors = usersAdapter.getSelectors(
  (state: RootState) => state.users,
);

export const selectAllUsers = usersSelectors.selectAll;

export default usersSlice.reducer;
