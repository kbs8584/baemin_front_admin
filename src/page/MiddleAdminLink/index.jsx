import { useSelector } from 'react-redux';

import { Typography, Grid } from '@mui/material';

import Table from 'components/Table';
import { Button } from 'components/Atoms';
import { SearchBar, SearchSelect } from 'components/Molecules';

export default function MiddleAdminLink() {
  const middleAdmin = useSelector(state => state.manage.middleAdmin);

  /*
        매장 아이디 추가될 것 ! storeId
        adminSeq: Number, -> 연동되어있는 중간관리자 id // 0 -> 연동하기, // userSeq === adminSeq
        adminStore: String, -> 연동되어있느 중간관리자명
        cmsId: String,
        storeName: String,
        email: String, -> X

        미가입된 경우는 없음
     */

  const columns = [
    {
      headerClassName: 'super-app-theme--header',
      field: 'storeId', // will add
      headerName: '매장 ID',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      width: 120,
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
        console.log(params);
        const isLinked = middleAdmin.currentUserSeq === params.row.adminSeq;

        return (
          <Button
            id={params.row.storeId}
            sx={{ width: 0.7, bgcolor: 'common.white' }}
            variant="outlined"
          >
            {isLinked ? '해제하기' : '연동하기'}
          </Button>
        );
      },
      width: 165,
    },
  ];

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
          <Button variant="contained">
            <Typography fontSize="14px">선택 매장 연동 해제</Typography>
          </Button>
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained">
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
