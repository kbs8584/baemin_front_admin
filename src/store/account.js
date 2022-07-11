import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

const initialState = {
  status: 'idle',
  isSuccessCreateAccount: false,
  canCreateAccount: false,

  cmsAdmin: {
    storeId: '',
    storeName: '',
    storeEmail: '',
    id: '',
    password: '',
    status: 'idle',
    errorMessage: '',
    ajaxError: null,
    duplicatedCheck: false,
  },

  middleAdmin: {
    status: 'idle',
    id: '',
    name: '',
    email: '',
    password: '',

    duplicatedCheck: {
      status: 'idle',
      id: false,
      email: false,
      message: '',
    },
    error: '',
  },
};

export const fetchStoreNameAndEmail = createAsyncThunk(
  'account/fetchStoreNameAndEmail',
  async id => {
    try {
      const response = await API.get('/api/v1/robot/store', {
        params: { storeId: id },
      });

      return response.data;
    } catch (error) {
      return error.response;
    }
  },
);

export const checkIsDuplicatedAccountId = createAsyncThunk(
  'account/checkIsDuplicatedAccountId',
  async id => {
    const response = await API.get('/api/v1/login/checkUserId', {
      params: {
        userId: id,
      },
    });

    return response.data;
  },
);

// 중복검사가 정확히 어떤 값에 이루어지는지 기획 및 백단 검토 필요, 지금은 임시로!
export const checkIdIsDuplicated = createAsyncThunk(
  'account/checkIdIsDuplicated',
  async data => {
    const response = API.get('api/v1/login/checkUserId', {
      params: data,
    });

    return response;
  },
);

export const checkEmailIsDuplicated = createAsyncThunk(
  'account/checkEmailIsDuplicated',
  async (data, { rejectWithValue }) => {
    const response = API.get('api/v1/login/checkEmail', {
      params: data,
    });

    return response;
  },
);

export const createAccount = createAsyncThunk(
  'account/createAccount',
  async formData => {
    const response = await API.post('api/v1/login/signUp', formData);

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
    initErrorMessage: ({ cmsAdmin }) => {
      cmsAdmin.errorMessage = '';
    },
    initDuplicatedCheckStatus: ({ middleAdmin }) => {
      middleAdmin.duplicatedCheck.status = 'idle';
    },
    setCMSInputValue: ({ cmsAdmin }, { payload }) => {
      cmsAdmin[payload.name] = payload.value;
    },
    setMiddleAdminInputValue: ({ middleAdmin }, { payload }) => {
      middleAdmin[payload.name] = payload.value;
    },
    setCanCreateAccount: (state, { payload }) => {
      state.canCreateAccount = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStoreNameAndEmail.pending, ({ cmsAdmin }) => {
        cmsAdmin.status = 'loading';

        cmsAdmin.storeName = '';
        cmsAdmin.storeEmail = '';

        cmsAdmin.errorMessage = '';
      })
      .addCase(
        fetchStoreNameAndEmail.fulfilled,
        ({ cmsAdmin }, { payload }) => {
          if (payload.status === 400) {
            cmsAdmin.status = 'fail';

            if (payload.data.message === '가입된 매장 입니다.') {
              cmsAdmin.errorMessage = '가입된 매장입니다.';
              cmsAdmin.storeId = '';
            } else {
              cmsAdmin.errorMessage = '등록되지 않은 매장 ID입니다.';
              cmsAdmin.storeId = '';
            }

            return;
          }

          cmsAdmin.status = 'success';
          cmsAdmin.storeName = payload.name;

          if (!payload.email)
            alert(
              '등록된 이메일이 없습니다. 매장 대표자 이메일 등록 후, CMS아이디 생성이 가능합니다.',
            );

          cmsAdmin.storeEmail = payload.email;
        },
      )
      .addCase(fetchStoreNameAndEmail.rejected, ({ cmsAdmin }, { error }) => {
        cmsAdmin.status = 'fail';
        cmsAdmin.ajaxError = error.message;
      })
      .addCase(checkIsDuplicatedAccountId.pending, ({ cmsAdmin }) => {
        cmsAdmin.status = 'loading';
      })
      .addCase(
        checkIsDuplicatedAccountId.fulfilled,
        ({ cmsAdmin }, { payload }) => {
          cmsAdmin.status = 'success';

          if (payload.idCheck) {
            alert('사용 가능한 ID 입니다.');
            cmsAdmin.duplicatedCheck = payload.idCheck;
          } else {
            alert('이미 존재하는 ID 입니다.');
            cmsAdmin.duplicatedCheck = payload.idCheck;
          }
        },
      )
      .addCase(
        checkIsDuplicatedAccountId.rejected,
        ({ cmsAdmin }, { payload }) => {
          cmsAdmin.status = 'fail';
        },
      )
      .addCase(checkIdIsDuplicated.pending, ({ middleAdmin }) => {
        middleAdmin.duplicatedCheck.status = 'loading';
      })
      .addCase(
        checkIdIsDuplicated.fulfilled,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.duplicatedCheck.status = 'success';

          if (payload.data.idCheck) {
            middleAdmin.duplicatedCheck.id = true;
            middleAdmin.duplicatedCheck.message = '사용 가능한 ID 입니다.';

            return;
          }

          middleAdmin.duplicatedCheck.id = false;
          middleAdmin.duplicatedCheck.message =
            '이미 존재하는 ID 입니다. 다른 ID를 사용해주세요.';
        },
      )
      .addCase(checkIdIsDuplicated.rejected, ({ middleAdmin }) => {
        middleAdmin.duplicatedCheck.status = 'fail';
      })
      .addCase(checkEmailIsDuplicated.pending, ({ middleAdmin }) => {
        middleAdmin.duplicatedCheck.status = 'loading';
      })
      .addCase(
        checkEmailIsDuplicated.fulfilled,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.duplicatedCheck.status = 'success';

          if (payload.data.emailCheck) {
            middleAdmin.duplicatedCheck.email = true;
            middleAdmin.duplicatedCheck.message = '사용 가능한 이메일 입니다.';

            return;
          }

          middleAdmin.duplicatedCheck.email = false;
          middleAdmin.duplicatedCheck.message =
            '이미 존재하는 이메일 입니다. 다른 이메일을 사용해주세요.';
        },
      )
      .addCase(checkEmailIsDuplicated.rejected, ({ middleAdmin }) => {
        middleAdmin.duplicatedCheck.status = 'fail';
      })
      .addCase(createAccount.pending, state => {
        state.status = 'loading';
      })
      .addCase(createAccount.fulfilled, (state, { payload }) => {
        state.status = 'success';

        if (payload.msg === 'Complete') {
          state.isSuccessCreateAccount = true;
        }
      })
      .addCase(createAccount.rejected, (state, { payload }) => {});
  },
});

export const {
  initializeState,
  initErrorMessage,
  initDuplicatedCheckStatus,
  setCMSInputValue,
  setMiddleAdminInputValue,
  setCanCreateAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
