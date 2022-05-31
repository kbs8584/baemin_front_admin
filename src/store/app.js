import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersInfo } from "api/auth";

const initialState = {
  currentMenu: "/",
  storeList: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentMenu: (state, action) => {
      state.currentMenu = action.payload;
    },
  },
});

export const { setCurrentMenu } = appSlice.actions;
export default appSlice.reducer;
