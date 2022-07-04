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
    linkedList: [],
    /*
      {
        allCount: String,
        list: Array,
        totalPage: String
      }
    */
    availableList: [],

    totalPage: null,
    error: null,
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
      .addCase(fetchAccountList.rejected, () => {})
      .addCase(
        fetchNotLinkedAccountList.pending,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'loading';
        },
      )
      .addCase(
        fetchNotLinkedAccountList.fulfilled,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'success';

          middleAdmin.availableList = payload.content;
          middleAdmin.totalPage = payload.totalPages;
          middleAdmin.allCount = payload.totalElements;
        },
      )
      .addCase(
        fetchNotLinkedAccountList.rejected,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'fail';
          // middleAdmin.error
        },
      )
      .addCase(
        fetchLinkedAccountList.pending,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'loading';
        },
      )
      .addCase(
        fetchLinkedAccountList.fulfilled,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'success';

          middleAdmin.linkedList = payload.content;
          middleAdmin.totalPage = payload.totalPages;
          middleAdmin.allCount = payload.totalElements;
        },
      )
      .addCase(
        fetchLinkedAccountList.rejected,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'fail';
          // middleAdmin.error
        },
      )
      .addCase(linkStoreToMiddleAccount.pending, ({ middleAdmin }) => {
        middleAdmin.status = 'loading';
      })
      .addCase(
        linkStoreToMiddleAccount.fulfilled,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'success';

          if (payload.msg === 'Complete') {
            alert('연동되었습니다.');
          }
        },
      )
      .addCase(
        linkStoreToMiddleAccount.rejected,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'fail';
        },
      )
      .addCase(unlinkStoreToMiddleAccount.pending, ({ middleAdmin }) => {
        middleAdmin.status = 'loading';
      })
      .addCase(
        unlinkStoreToMiddleAccount.fulfilled,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'success';

          if (payload.msg === 'Complete') {
            alert('연동이 해제되었습니다.');
          }
        },
      )
      .addCase(
        unlinkStoreToMiddleAccount.rejected,
        ({ middleAdmin }, { payload }) => {
          middleAdmin.status = 'fail';
        },
      );
  },
});

export const { setSearchText, setCurrentUserSeq, setCurrentSelectedStoreList } =
  manageSlice.actions;
export default manageSlice.reducer;
