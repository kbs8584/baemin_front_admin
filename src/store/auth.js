import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "api/auth";

const initialState = {
  status: "idle",
  user: false,
  error: null,
};

export const getUser = createAsyncThunk("auth/getUser", async (data) => {
  const user = await signIn(data);
  return user;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";

        console.log(action.payload)
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action?.error.message;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
