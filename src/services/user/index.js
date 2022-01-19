import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

export const getModuleState = (state) => state.user;

export const selectors = {
  getUser(state) {
    const { user } = getModuleState(state);
    return user;
  },
};

const slice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    setUserInfo(state, { payload }) {
      const { user } = payload;
      state.user = user;
    },
  },
});

export const actions = slice.actions;
export const reducer = persistReducer(
  {
    key: 'user',
    storage: storageSession,
  },
  slice.reducer
);
