import API from 'api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  searchText: '',
  searchColumn: 0,
  middleAdmin: {
    status: 'idle',
    allCount: null,
    list: [],
    totalPage: null,
    error: null,
  },
};

export const fetchNotLinkedAccountList = createAsyncThunk(
  'manage/fetchNotLinkedAccountList',
  async id => {
    const response = await API.get('/api/v1/middle', {
      params: {
        userSeq: id,
      },
    });

    console.log('fetchNotLinkedAccountList', response.data);
  },
);

export const fetchAccountList = createAsyncThunk(
  'manage/fetchAccountList',
  async data => {
    /*
     searchMode
     0: 전체 검색
     1: 아이디 검색
     2: 매장명 검색
     */

    console.log('data', data);

    const response = await API.get('/api/v1/user/search', {
      params: {
        cpage: data.cpage,
        rowItem: data.rowItem,
        sortMode: data.sortMode,
        searchInput: data.searchInput,
        searchMode: data.searchMode,
        orderMode: data.orderMode,
        role: data.role,
      },
    });

    return response.data;
    /*
      {
        allCount: String,
        list: Array,
        totalPage: String
      }
     */
  },
);

export const manageSlice = createSlice({
  name: 'manage',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
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
    builder.addCase(fetchAccountList.rejected, () => {});
  },
});

export const { setSearchText } = manageSlice.actions;
export default manageSlice.reducer;
