import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "api";
import { signIn } from "api/auth";

const initialState = {
  status: "idle",
  user: null,
  error: null,
};
const TOKEN = "TOKEN";

export const getUser = createAsyncThunk("auth/getUser", async (data) => {
  const user = await signIn(data);
  return user;
});

export const validateProfile = createAsyncThunk(
  "auth/validateProfile",
  async (token) => {
    const user = await API.get("/api/v1/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        API.setAuthInterceptor(token, authSlice.actions.autoSignOut);
        sessionStorage.setItem(TOKEN, token);

        return res.data;
      })
      .catch((error) => console.error(error));

    return user;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    autoSignOut: (state, action) => {
      API.clearAuthInterceptors();
      sessionStorage.removeItem(TOKEN);

      state.user = null;
    },
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
        if (action?.payload.result === "success") {
          state.user = action.payload;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action?.error.message;
      })
      .addCase(validateProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(validateProfile.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(validateProfile.rejected, (state, action) => {
        state.error = action?.error.message;
      });
  },
});

export const { setUser, setChecked } = authSlice.actions;
export default authSlice.reducer;
