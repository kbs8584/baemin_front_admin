import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "api";

const initialState = {
  storeData: [],
};
const TOKEN = "TOKEN";
const TOKEN_KEY = sessionStorage.getItem(TOKEN);

export const getStoreList = createAsyncThunk(
  "storeList/getStoreList",
  async (page, input, mode) => {
    try {
      const response = await API.get("/api/v1/user/search", {
        params: {
          cpage: page,
          rowItem: 10,
          sortMode: 1,
          searchInput: input,
          searchMode: mode,
          orderMode: false,
        },
        headers: { Authorization: `Bearer ${TOKEN_KEY}` },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAllStoreList = createAsyncThunk(
  "storeList/getAllStoreList",
  async () => {
    try {
      const response = await API.get("/api/v1/user", {
        params: {
          cpage: 1,
          rowItem: 1000,
          sortMode: 0,
          orderMode: false,
          role: 1,
        },
        headers: { Authorization: `Bearer ${TOKEN_KEY}` },
      });
      return response.data.list;
    } catch (error) {
      console.error(error);
    }
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
    builder.addCase(getAllStoreList.fulfilled, (state, action) => {
      state.storeData = action.payload;
    });
  },
});

export default storeListSlice.reducer;
