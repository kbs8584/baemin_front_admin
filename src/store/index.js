import { configureStore } from '@reduxjs/toolkit';

import appReducer from 'store/app';
import authReducer from 'store/auth';
import accountReducer from 'store/account';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    account: accountReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
