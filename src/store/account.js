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
    errorMessage: '',
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
    try {
      const response = await API.get('/api/v1/robot/store', {
        params: { storeId: id },
      });

      console.log('success', response);
      return response.data;
    } catch (error) {
      console.log('error', error.response);

      return error.response;
    }

    // return response.data;
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
        cmsAdmin.errorMessage = '';
      })
      .addCase(
        fetchStoreNameAndEmail.fulfilled,
        ({ cmsAdmin }, { payload }) => {
          cmsAdmin.status = 'success';

          if (payload.status === 400) {
            cmsAdmin.status = 'fail';
            cmsAdmin.errorMessage = '가입된 매장입니다.';

            return;
          }

          cmsAdmin.storeName = payload.name;

          if (!cmsAdmin.storeEmail)
            alert(
              '등록된 이메일이 없습니다. 매장 대표자 이메일 등록 후, CMS아이디 생성이 가능합니다.',
            );

          cmsAdmin.storeEmail = payload.email;
        },
      )
      .addCase(fetchStoreNameAndEmail.rejected, ({ cmsAdmin }, { error }) => {
        cmsAdmin.status = 'fail';
        cmsAdmin.errorMessage = '등록되지 않은 매장 ID 입니다.';
      });
  },
});

export const { initializeState, setCMSInputValue, setMiddleAdminInputValue } =
  accountSlice.actions;

export default accountSlice.reducer;
