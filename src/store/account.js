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
      id: false,
      name: false,
      email: false,
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
export const checkIsFieldDuplicated = createAsyncThunk(
  'account/checkIsFieldDuplicated',
  async fieldData => {
    return {
      name: fieldData.name,
      data: true, // temp
    };
  },
);

export const createAccount = createAsyncThunk(
  'account/createAccount',
  async formData => {
    const response = await API.post('api/v1/login/signUp', formData);

    console.log(response.data);

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
          // 매장 ID 조회는 배민 로봇 에이전트를 거치고 나오는 응답임
          // '등록되지 않은 매장 ID'는 텐스의 Server만으로는 알 수 없음.
          // Error 처리가 현재 기형적임

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
            // 배민 로봇 에이전트 -> 이메일 계정이 없는경우 가입이 불가능하게 만들면
            // 아래 코드가 필요없음
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
          cmsAdmin.duplicatedCheck = payload.idCheck;
          alert('사용 가능한 ID 입니다.');
        },
      )
      .addCase(
        checkIsDuplicatedAccountId.rejected,
        ({ cmsAdmin }, { payload }) => {
          cmsAdmin.status = 'fail';
        },
      )
      .addCase(checkIsFieldDuplicated.pending, ({ middleAdmin }) => {
        middleAdmin.status = 'loading';
      })
      .addCase(
        checkIsFieldDuplicated.fulfilled,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'success';
          middleAdmin.duplicatedCheck[payload.name] = payload.data;
        },
      )
      .addCase(
        checkIsFieldDuplicated.rejected,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'fail';
        },
      )
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
  setCMSInputValue,
  setMiddleAdminInputValue,
  setCanCreateAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
