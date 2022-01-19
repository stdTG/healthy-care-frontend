import { Action, CombinedState, configureStore, getDefaultMiddleware, Reducer } from '@reduxjs/toolkit';
import {
  persistStore,
  REHYDRATE,
  REGISTER,
  PERSIST,
  PAUSE,
  FLUSH,
  PURGE,
} from 'redux-persist';

import rootReducer, { RootState } from './reducer';


const store = configureStore({
  reducer: rootReducer as Reducer<RootState, Action>,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;
