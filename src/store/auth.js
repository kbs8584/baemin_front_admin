import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "api";
import { signIn } from "api/auth";

const initialState = {
  status: "idle",
  user: null,
  error: null,
};
const AUTH_TOKEN = sessionStorage.getItem("TOKEN");

export const getUser = createAsyncThunk("auth/getUser", async (data) => {
  const user = await signIn(data);
  return user;
});

export const checkUser = createAsyncThunk("auth/checkUser", (token) => {
  API.get(`/api/v1/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log("res", res.data);
      // sessionStorage.setItem("TOKEN", token);
      return res.data;
    })
    .catch(() => {
      // sessionStorage.removeItem("TOKEN");
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action?.error.message;
      })
      .addCase(checkUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.error = action?.error.message;
      });
  },
});

export const { setUser, setChecked } = authSlice.actions;
export default authSlice.reducer;
