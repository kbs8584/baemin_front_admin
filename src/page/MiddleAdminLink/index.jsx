import { useDispatch, useSelector } from 'react-redux';

import { Typography, Grid } from '@mui/material';

import Table from 'components/Table';
import { Button } from 'components/Atoms';
import { SearchBar, SearchSelect } from 'components/Molecules';
import {
  linkStoreToMiddleAccount,
  unlinkStoreToMiddleAccount,
  setCurrentSelectedStoreList,
} from 'store/manage';

export default function MiddleAdminLink() {
  const middleAdmin = useSelector(state => state.manage.middleAdmin);

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
        const isLinked = middleAdmin.currentUserSeq === params.row.adminSeq;

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

  const handleLinkStoreClick = e => {
    dispatch(
      linkStoreToMiddleAccount({
        userSeq: middleAdmin.currentUserSeq,
        storeList: [e.currentTarget.id],
      }),
    );
  };

  const handleUnlinkStoreClick = e => {
    dispatch(
      unlinkStoreToMiddleAccount({
        userSeq: middleAdmin.currentUserSeq,
        storeList: [e.currentTarget.id],
      }),
    );
  };

  const handleLinkSelectedStore = () => {
    dispatch(
      linkStoreToMiddleAccount({
        userSeq: middleAdmin.currentUserSeq,
        storeList: middleAdmin.currentSelectedStoreList,
      }),
    );
  };

  const handleUnlinkSelectedStore = () => {
    dispatch(
      unlinkStoreToMiddleAccount({
        userSeq: middleAdmin.currentUserSeq,
        storeList: middleAdmin.currentSelectedStoreList,
      }),
    );
  };

  const handleCheckBoxClick = params => {
    dispatch(setCurrentSelectedStoreList(params));
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
            // searchMenuIndex={searchMenuIndex}
            // onChange={handleChangeSelect}
            dataset={['전체', '매장 ID', '매장명', 'CMS ID']}
          />
        </Grid>

        <Grid item xs>
          <SearchBar role={2} />
        </Grid>
      </Grid>

      <Table
        checkboxSelection
        disableSelectionOnClick
        columns={columns}
        rows={middleAdmin.availableList}
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
