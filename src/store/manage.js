import API from 'api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  searchText: '',
  searchColumn: 0,

  middleAdmin: {
    status: 'idle',
    currentUserSeq: null,
    currentSelectedStoreList: [],
    allCount: null,
    list: [],
    totalPage: null,
    error: null,
  },

  notLinkedAccount: {
    status: 'idle',
    list: [],
    totalPage: 0,
    allCount: 0,
  },

  linkedAccount: {
    status: 'idle',
    list: [],
    totalPage: 0,
    allCount: 0,
  },

  linkAction: {
    status: 'idle',
    error: null,
    message: '',
  },

  unlinkAction: {
    status: 'idle',
    error: null,
    message: '',
  },
};

export const linkStoreToMiddleAccount = createAsyncThunk(
  'manage/linkStoreToMiddleAccount',
  async rawData => {
    const response = await API.post('/api/v1/middle', rawData);

    return response.data;
  },
);

export const unlinkStoreToMiddleAccount = createAsyncThunk(
  'manage/unlinkStoreToMiddleAccount',
  async rawData => {
    const response = await API.patch('/api/v1/middle', rawData);

    return response.data;
  },
);

export const fetchNotLinkedAccountList = createAsyncThunk(
  'manage/fetchNotLinkedAccountList',
  async id => {
    const response = await API.get('/api/v1/middle', {
      params: {
        userSeq: id,
      },
    });

    return response.data;
  },
);

export const fetchLinkedAccountList = createAsyncThunk(
  'manage/fetchLinkedAccountList',
  async id => {
    const response = await API.get('/api/v1/middle/list', {
      params: {
        userSeq: id,
      },
    });

    return response.data;
  },
);

export const fetchAccountList = createAsyncThunk(
  'manage/fetchAccountList',
  async data => {
    const response = await API.get('/api/v1/user/search', {
      params: {
        cpage: data?.cpage,
        rowItem: data?.rowItem,
        sortMode: data?.sortMode,
        searchInput: data?.searchInput,
        searchMode: data?.searchMode,
        orderMode: data?.orderMode,
        role: data?.role,
      },
    });

    return response.data;
  },
);

export const searchLinkedAccountList = createAsyncThunk(
  'manage/searchLinkedAccountList',
  async data => {
    const response = await API.get('/api/v1/middle/list/search', {
      params: data,
    });

    console.log('Linked Account List', response.data);
    return response.data;
  },
);

export const searchWillLinkAccountList = createAsyncThunk(
  'manage/searchWillLinkAccountList',
  async data => {
    const response = await API.get('/api/v1/middle/search', {
      params: data,
    });

    console.log('Will Link Account List', response.data);
    return response.data;
  },
);

export const manageSlice = createSlice({
  name: 'manage',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setCurrentUserSeq: ({ middleAdmin }, { payload }) => {
      middleAdmin.currentUserSeq = payload;
    },
    setCurrentSelectedStoreList: ({ middleAdmin }, { payload }) => {
      middleAdmin.currentSelectedStoreList = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAccountList.pending, ({ middleAdmin }) => {
      middleAdmin.status = 'loading';
    });
    builder.addCase(
      fetchAccountList.fulfilled,
      ({ middleAdmin }, { payload }) => {
        middleAdmin.allCount = payload.allCount;
        middleAdmin.list = payload.list;
        middleAdmin.totalPage = payload.totalPage;
      },
    );
    builder
      .addCase(
        fetchNotLinkedAccountList.pending,
        ({ notLinkedAccount }, { payload }) => {
          notLinkedAccount.status = 'loading';
        },
      )
      .addCase(
        fetchNotLinkedAccountList.fulfilled,
        ({ notLinkedAccount }, { payload }) => {
          notLinkedAccount.status = 'success';

          notLinkedAccount.list = payload.content;
          notLinkedAccount.totalPage = payload.totalPages;
          notLinkedAccount.allCount = payload.totalElements;
        },
      )
      .addCase(
        fetchNotLinkedAccountList.rejected,
        ({ notLinkedAccount }, { payload }) => {
          notLinkedAccount.status = 'fail';
          // middleAdmin.error
        },
      )
      .addCase(fetchLinkedAccountList.pending, ({ linkedAccount }) => {
        linkedAccount.status = 'loading';
      })
      .addCase(
        fetchLinkedAccountList.fulfilled,
        ({ linkedAccount }, { payload }) => {
          linkedAccount.status = 'success';

          linkedAccount.list = payload.content;
          linkedAccount.totalPage = payload.totalPages;
          linkedAccount.allCount = payload.totalElements;
        },
      )
      .addCase(
        fetchLinkedAccountList.rejected,
        ({ linkedAccount }, { payload }) => {
          linkedAccount.status = 'fail';
          // middleAdmin.error
        },
      )
      .addCase(linkStoreToMiddleAccount.pending, ({ linkAction }) => {
        linkAction.status = 'loading';
      })
      .addCase(
        linkStoreToMiddleAccount.fulfilled,
        ({ linkAction }, { payload }) => {
          linkAction.status = 'success';

          if (payload.msg === 'Complete') {
            alert('연동되었습니다.');
          }
        },
      )
      .addCase(
        linkStoreToMiddleAccount.rejected,
        ({ linkAction }, { payload }) => {
          linkAction.status = 'fail';
        },
      )
      .addCase(unlinkStoreToMiddleAccount.pending, ({ unlinkAction }) => {
        unlinkAction.status = 'loading';
      })
      .addCase(
        unlinkStoreToMiddleAccount.fulfilled,
        ({ unlinkAction }, { payload }) => {
          unlinkAction.status = 'success';

          if (payload.msg === 'Complete') {
            // add success message
            alert('연동이 해제되었습니다.');
          }
        },
      )
      .addCase(
        unlinkStoreToMiddleAccount.rejected,
        ({ unlinkAction }, { payload }) => {
          // add error message
          unlinkAction.status = 'fail';
        },
      )
      /////////////////////////////// Search ///////////////////////////////////
      .addCase(searchLinkedAccountList.pending, ({ linkedAccount }) => {
        linkedAccount.status = 'loading';
      })
      .addCase(
        searchLinkedAccountList.fulfilled,
        ({ linkedAccount }, { payload }) => {
          linkedAccount.status = 'success';

          linkedAccount.list = payload.content;
          linkedAccount.totalPage = payload.totalPages;
          linkedAccount.allCount = payload.totalElements;
        },
      )
      .addCase(
        searchLinkedAccountList.rejected,
        ({ linkedAccount }, { payload }) => {
          // add error message
          linkedAccount.status = 'fail';
        },
      )
      .addCase(searchWillLinkAccountList.pending, ({ notLinkedAccount }) => {
        notLinkedAccount.status = 'loading';
      })
      .addCase(
        searchWillLinkAccountList.fulfilled,
        ({ notLinkedAccount }, { payload }) => {
          notLinkedAccount.status = 'success';

          notLinkedAccount.list = payload.content;
          notLinkedAccount.totalPage = payload.totalPages;
          notLinkedAccount.allCount = payload.totalElements;
        },
      )
      .addCase(
        searchWillLinkAccountList.rejected,
        ({ notLinkedAccount }, { payload }) => {
          // add error message
          notLinkedAccount.status = 'fail';
        },
      );
  },
});

export const { setSearchText, setCurrentUserSeq, setCurrentSelectedStoreList } =
  manageSlice.actions;
export default manageSlice.reducer;
