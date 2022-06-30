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
};

export const fetchStoreNameAndEmail = createAsyncThunk(
  'account/fetchStoreNameAndEmail',
  async id => {
    const response = await API.get('/api/v1/robot/store', {
      params: { storeId: id },
    });

    console.log('=>(account.js:28) response.data', response.data);

    return response;
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
      .addCase(fetchStoreNameAndEmail.pending, ({ cmsAdmin }) => {})
      .addCase(
        fetchStoreNameAndEmail.fulfilled,
        ({ cmsAdmin }, { payload }) => {
          console.log('fullfilled', payload);
        },
      )
      .addCase(fetchStoreNameAndEmail.rejected, ({ cmsAdmin }, { error }) => {
        console.log('rejected', error);
      });
  },
});

export const { initializeState, setCMSInputValue, setMiddleAdminInputValue } =
  accountSlice.actions;

export default accountSlice.reducer;
