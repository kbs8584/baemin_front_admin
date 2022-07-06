import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentMenu: '/',

  isOpenDialog: {
    resultOfIssueUserId: false,
    resultOfIssueMiddleAdminId: false,
  },

  snackbar: {
    open: false,
    message: '',
  },
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
    setSnackbar: (state, { payload }) => {
      state.snackbar = {
        open: payload.open,
        message: payload.message,
      };
    },
    setCloseSnackbar: state => {
      state.snackbar = initialState['snackbar'];
    },
  },
});

export const {
  setCurrentMenu,
  setIsOpenDialog,
  setSnackbar,
  setCloseSnackbar,
} = appSlice.actions;
export default appSlice.reducer;
