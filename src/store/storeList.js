import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersInfo } from "api/auth";

const initialState = {
  storeData: [],
};

export const getStoreList = createAsyncThunk(
  "storeList/getUsersInfo",
  async () => {
    const res = await getUsersInfo();
    return res.list;
  }
);

export const storeListSlice = createSlice({
  name: "storeList",
  initialState,
  redcuer: {},
  extraReducers: (builder) => {
    builder.addCase(getStoreList.fulfilled, (state, action) => {
      state.storeData = action.payload;
    });
  },
});

export default storeListSlice.reducer;
