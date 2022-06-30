import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

const initialState = {
  cmsAdmin: {
    storeId: '',
    storeName: '',
    storeEmail: '',
    id: '',
    password: '',
    status: 'idle',
    error: '',
  },

  middleAdmin: {
    id: '',
    name: '',
    email: '',
    password: '',
    status: 'idle',
    error: '',
  },

  isAvailable: false,
};

export const fetchStoreNameAndEmail = createAsyncThunk(
  'account/fetchStoreNameAndEmail',
  async id => {
    const response = await API.get('/api/v1/robot/store', {
      params: { storeId: id },
    });

    return response.data;
  },
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    initializeState: (state, { payload }) => {
      state[payload.name] = initialState[payload.name];
    },
    setCMSInputValue: ({ cmsAdmin }, { payload }) => {
      cmsAdmin[payload.name] = payload.value;
    },
    setMiddleAdminInputValue: ({ middleAdmin }, { payload }) => {
      middleAdmin[payload.name] = payload.value;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStoreNameAndEmail.pending, ({ cmsAdmin }) => {
        cmsAdmin.status = 'loading';
      })
      .addCase(
        fetchStoreNameAndEmail.fulfilled,
        ({ cmsAdmin }, { payload }) => {
          cmsAdmin.status = 'success';
          // cmsAdmin.storeName = payload
          // 어후 열받아

          console.log(payload);
        },
      )
      .addCase(fetchStoreNameAndEmail.rejected, ({ cmsAdmin }, { error }) => {
        cmsAdmin.status = 'fail';
        cmsAdmin.error = '가입된 매장입니다.';
      });
  },
});

export const { initializeState, setCMSInputValue, setMiddleAdminInputValue } =
  accountSlice.actions;

export default accountSlice.reducer;
