import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/features/store';

interface AuthState {
  user: object | { id: number };
  accessToken: string;
}

const initialState: AuthState = {
  user: {},
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: { id: number }; accessToken: string }>
    ) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.user = {};
      state.accessToken = '';
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
