import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import appReducer from "store/app";
import authReducer from "store/auth";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
