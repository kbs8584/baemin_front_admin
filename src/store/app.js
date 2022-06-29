import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsersInfo } from 'api/auth';

const initialState = {
  currentMenu: '/',

  isOpenDialog: {
    resultOfIssueUserId: false,
    resultOfIssueMiddleAdminId: false,
  },

  storeList: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentMenu: (state, action) => {
      state.currentMenu = action.payload;
    },
    setIsOpenDialog: ({ isOpenDialog }, action) => {
      isOpenDialog[action.payload.name] = action.payload.status;
    },
  },
});

export const { setCurrentMenu, setIsOpenDialog } = appSlice.actions;
export default appSlice.reducer;
