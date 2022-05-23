import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMenu: "/",
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
