import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Grid } from '@mui/material';

import Table from 'components/Table';
import { Button } from 'components/Atoms';
import { SearchBar, SearchSelect } from 'components/Molecules';
import {
  linkStoreToMiddleAccount,
  unlinkStoreToMiddleAccount,
  setCurrentSelectedStoreList,
  fetchNotLinkedAccountList,
  searchWillLinkAccountList,
} from 'store/manage';

export default function MiddleAdminLink() {
  const currentUserSeq = useSelector(
    state => state.manage.middleAdmin.currentUserSeq,
  );
  const currentSelectedStoreList = useSelector(
    state => state.manage.middleAdmin.currentSelectedStoreList,
  );
  const notLinkedAccount = useSelector(state => state.manage.notLinkedAccount);
  const linkAction = useSelector(state => state.manage.linkAction);
  const unlinkAction = useSelector(state => state.manage.unlinkAction);
  const inputText = useSelector(state => state.manage.searchText);

  const [searchMenuIndex, setSearchMenuIndex] = useState(0);

  const dispatch = useDispatch();

  const columns = [
    {
      headerClassName: 'super-app-theme--header',
      field: 'storeId', // will add
      headerName: '매장 ID',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      width: 134,
    },
    {
      headerClassName: 'super-app-theme--header',
      field: 'storeName',
      headerName: '매장명',
      editable: false,
      width: 300,
    },
    {
      headerClassName: 'super-app-theme--header',
      field: 'cmsId',
      headerName: 'CMS ID',
      editable: false,
      width: 500,
    },
    {
      headerClassName: 'super-app-theme--header',
      field: 'adminSeq',
      headerName: 'CMS 동기화',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      renderCell: params => {
        const isLinked = currentUserSeq === params.row.adminSeq;

        return (
          <>
            {isLinked ? (
              <Button
                id={params.row.storeId}
                sx={{
                  width: 0.7,
                  bgcolor: '#8E929F',
                  border: 'none',
                  color: 'common.white',

                  '&:hover': {
                    bgcolor: '#8E929F',
                    border: '1px solid #8E929F',
                  },
                }}
                variant="outlined"
                onClick={handleUnlinkStoreClick}
              >
                <Typography fontSize="14px">해제하기</Typography>
              </Button>
            ) : (
              <Button
                id={params.row.storeId}
                sx={{ width: 0.7, bgcolor: 'common.white' }}
                variant="outlined"
                onClick={handleLinkStoreClick}
              >
                <Typography fontSize="14px">연동하기</Typography>
              </Button>
            )}
          </>
        );
      },
      width: 150,
    },
  ];

  useEffect(() => {
    if (linkAction.status === 'success' || unlinkAction.status === 'success') {
      dispatch(fetchNotLinkedAccountList(currentUserSeq));
    }
  }, [linkAction.status, unlinkAction.status]);

  const handleLinkStoreClick = e => {
    dispatch(
      linkStoreToMiddleAccount({
        userSeq: currentUserSeq,
        storeList: [e.currentTarget.id],
      }),
    );
  };

  const handleUnlinkStoreClick = e => {
    dispatch(
      unlinkStoreToMiddleAccount({
        userSeq: currentUserSeq,
        storeList: [e.currentTarget.id],
      }),
    );
  };

  const handleLinkSelectedStore = () => {
    dispatch(
      linkStoreToMiddleAccount({
        userSeq: currentUserSeq,
        storeList: currentSelectedStoreList,
      }),
    );
  };

  const handleUnlinkSelectedStore = () => {
    dispatch(
      unlinkStoreToMiddleAccount({
        userSeq: currentUserSeq,
        storeList: currentSelectedStoreList,
      }),
    );
  };

  const handleCheckBoxClick = params => {
    dispatch(setCurrentSelectedStoreList(params));
  };

  const handleChangeSelect = e => {
    setSearchMenuIndex(e.target.value);
  };

  const handleClickSearch = () => {
    const data = {
      userSeq: currentUserSeq,
      mode: searchMenuIndex,
      searchInput: inputText,
      size: 10,
      page: 0,
    };

    dispatch(searchWillLinkAccountList(data));
  };

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        columnSpacing={2}
        py={5}
      >
        <Grid item xs>
          <Typography fontSize="32px" fontWeight={700}>
            중간관리자[매장 추가]
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={handleUnlinkSelectedStore}
            color="error"
          >
            <Typography fontSize="14px">선택 매장 연동 해제</Typography>
          </Button>
        </Grid>

        <Grid item xs={2}>
          <Button onClick={handleLinkSelectedStore} variant="contained">
            <Typography fontSize="14px">선택 매장 연동</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid container alignItems="center" columnSpacing={3} mb={4}>
        <Grid item xs={2}>
          <SearchSelect
            searchMenuIndex={searchMenuIndex}
            onChange={handleChangeSelect}
            dataset={['전체', 'CMS ID', '매장명']}
          />
        </Grid>

        <Grid item xs>
          <SearchBar onClickSearch={handleClickSearch} />
        </Grid>
      </Grid>

      <Table
        checkboxSelection
        disableSelectionOnClick
        columns={columns}
        rows={notLinkedAccount.list}
        getRowId={row => row.storeId}
        onSelectionModelChange={handleCheckBoxClick}
        sx={{
          '& .MuiDataGrid-columnHeadersInner': {
            borderBottom: 6,
            fontSize: '1rem',
          },

          '& .MuiDataGrid-columnSeparator--sideRight': {
            display: 'none',
          },

          '& .MuiDataGrid-row:nth-of-type(2n)': {
            backgroundColor: 'grey.100',
          },
        }}
      />
    </>
  );
}
