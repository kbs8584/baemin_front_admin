import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography, Grid } from '@mui/material';

import { Button } from 'components/Atoms';
import { SearchBar, SearchSelect } from 'components/Molecules';
import Table from 'components/Table';

import {
  fetchLinkedAccountList,
  fetchNotLinkedAccountList,
  setSearchText,
  setCurrentUserSeq,
  fetchAccountList,
} from 'store/manage';

export default function MiddleAdmin() {
  const middleAdmin = useSelector(state => state.manage.middleAdmin);
  const inputText = useSelector(state => state.manage.searchText);

  const [searchMenuIndex, setSearchMenuIndex] = useState(0);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const columns = [
    {
      headerClassName: 'super-app-theme--header',
      field: 'userId',
      headerName: 'CMS ID',
      editable: false,
      width: 174,
    },
    {
      headerClassName: 'super-app-theme--header',
      field: 'storeName',
      headerName: '중간관리자명',
      editable: false,
      width: 240,
    },
    {
      headerClassName: 'super-app-theme--header',
      field: 'email',
      headerName: '이메일',
      editable: false,
      width: 240,
    },
    {
      headerClassName: 'super-app-theme--header',
      field: 'addStore',
      headerName: '매장추가',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      renderCell: params => {
        return (
          <Button
            id={params.id}
            onClick={handleAddStoreClick}
            sx={{ width: 0.7, bgcolor: 'common.white' }}
            variant="outlined"
          >
            매장 추가
          </Button>
        );
      },
      width: 160,
    },
    {
      headerClassName: 'super-app-theme--header',
      field: 'checkCMS',
      headerName: 'CMS 보기',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      renderCell: params => {
        return (
          <Button
            sx={{ width: 0.7, bgcolor: 'common.white' }}
            variant="outlined"
          >
            편집하기
          </Button>
        );
      },
      width: 160,
    },
    {
      headerClassName: 'super-app-theme--header',
      field: 'initPassword',
      headerName: '비밀번호 초기화',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      renderCell: params => {
        return (
          <Button
            sx={{
              width: 0.7,
              borderColor: 'primary.alert',
              backgroundColor: 'common.white',
              color: 'primary.alert',

              '&:hover': {
                backgroundColor: 'primary.alertBg',
                borderColor: 'red',
              },
            }}
            variant="outlined"
          >
            초기화
          </Button>
        );
      },
      width: 160,
    },
  ];

  useEffect(() => {
    dispatch(setSearchText(''));
  }, []);

  const handleRowClick = ({ row }) => {
    navigate('linked-store');

    dispatch(setCurrentUserSeq(row.userSeq));
    dispatch(fetchLinkedAccountList(row.userSeq));
  };

  const handleMoveIssueAccount = () => {
    navigate('create-id');
  };

  const handleAddStoreClick = e => {
    e.stopPropagation();

    navigate('link-store');

    dispatch(setCurrentUserSeq(parseInt(e.target.id)));
    dispatch(fetchNotLinkedAccountList(e.target.id));
  };

  const handleChangeSelect = e => {
    setSearchMenuIndex(e.target.value);
  };

  const handleClickSearch = () => {
    const data = {
      cpage: 1,
      rowItem: 10,
      sortMode: 1,
      searchInput: inputText,
      searchMode: searchMenuIndex,
      orderMode: false,
      role: 2,
    };

    dispatch(fetchAccountList(data));
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" py={5}>
        <Grid item xs>
          <Typography fontSize="32px" fontWeight={700}>
            중간관리자
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" onClick={handleMoveIssueAccount}>
            <Typography fontSize="14px">신규 중간 관리자 ID 생성</Typography>
          </Button>
        </Grid>
      </Grid>

      <Grid container alignItems="center" columnSpacing={3} mb={4}>
        <Grid item xs={2}>
          <SearchSelect
            searchMenuIndex={searchMenuIndex}
            onChange={handleChangeSelect}
            dataset={['전체', 'CMS ID', '중간관리자명']}
          />
        </Grid>

        <Grid item xs>
          <SearchBar role={2} onClickSearch={handleClickSearch} />
        </Grid>
      </Grid>

      <Table
        columns={columns}
        rows={middleAdmin.list}
        onRowClick={handleRowClick}
        getRowId={row => row.userSeq} // 변경 가능성 있음
        sx={{
          borderRadius: 3,
          textAlign: 'center',

          '& .MuiDataGrid-columnHeadersInner': {
            borderBottom: 6,
            fontSize: '1rem',
          },

          '& .MuiDataGrid-columnSeparator--sideRight': {
            display: 'none',
          },

          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },

          '& .MuiDataGrid-row:nth-of-type(2n)': {
            backgroundColor: 'grey.100',
          },

          '& .MuiDataGrid-cell:nth-of-type(1)': {
            paddingLeft: 5,
          },
          '& .MuiDataGrid-cell': {
            border: 0,
          },
        }}
      />
    </>
  );
}
