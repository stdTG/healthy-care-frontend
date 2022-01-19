import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

export const getModuleState = (state) => state.auth;

export const selectors = {
  isAuthenticated(state) {
    const { isAuthenticated } = getModuleState(state);
    return isAuthenticated;
  },
  getAccessToken(state) {
    const { accessToken } = getModuleState(state);
    return accessToken;
  },
  getUserProfile(state) {
    const { userProfile } = getModuleState(state);
    return userProfile;
  },
  getUserPoolIds(state) {
    const { userPoolId, clientId } = getModuleState(state);
    return { userPoolId, clientId };
  },
  getWorkspace(state) {
    const { workspace } = getModuleState(state);

    return workspace;
  },

  getSendbirdData(state) {
    const { sendbirdData } = getModuleState(state);

    return sendbirdData;
  },
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    accessToken: null,
    userProfile: {},
    workspace: null,
    userPoolId: null,
    clientId: null,
    username: null,
    sendbirdData: {},
    sendbirdSessionTokens: null,
  },
  reducers: {
    login(state, { payload }) {
      const {
        username,
        userProfile,
        accessToken,
        sendbirdSessionTokens,
      } = payload;

      state.isAuthenticated = true;
      state.accessToken = accessToken;
      state.userProfile = userProfile;
      state.username = username;
      state.sendbirdSessionTokens = sendbirdSessionTokens;
    },
    logout(state) {
      // just to generate action creator, see rootReducer - it resets the whole state
    },
    setWorkspace(state, { payload }) {
      const { workspace, userPoolId, clientId } = payload;

      state.workspace = workspace;
      state.userPoolId = userPoolId;
      state.clientId = clientId;
    },
    setSendbirdData(state, { payload }) {
      state.sendbirdData = payload;
    },
  },
});

export const actions = slice.actions;
export const reducer = persistReducer(
  {
    key: 'auth',
    storage: localStorage,
  },
  slice.reducer
);
