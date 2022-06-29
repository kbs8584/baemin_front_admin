import { configureStore } from '@reduxjs/toolkit';

import appReducer from 'store/app';
import authReducer from 'store/auth';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
