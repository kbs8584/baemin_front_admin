import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography, Grid } from '@mui/material';

import { Button } from 'components/Atoms';
import { SearchBar, SearchSelect } from 'components/Molecules';
import Table from 'components/Table';

import {
  fetchLinkedAccountList,
  unlinkStoreToMiddleAccount,
  setSearchText,
} from 'store/manage';

export default function MiddleAdminLinkedList() {
  const currentUserSeq = useSelector(
    state => state.manage.middleAdmin.currentUserSeq,
  );
  const linkedAccount = useSelector(state => state.manage.linkedAccount);
  const unlinkAction = useSelector(state => state.manage.unlinkAction);

  const [searchMenuIndex, setSearchMenuIndex] = useState(0);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const columns = [
    {
      headerClassName: 'super-app-theme--header',
      field: 'cmsId',
      headerName: 'CMS ID',
      editable: false,
      width: 174,
    },
    {
      headerClassName: 'super-app-theme--header',
      field: 'storeName',
      headerName: '매장명',
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
      headerName: 'CMS 동기화',
      headerAlign: 'center',
      align: 'center',
      editable: false,
      renderCell: params => {
        // console.log(params);

        return (
          <Button
            id={params.id}
            onClick={handleUnlinkStoreClick}
            sx={{ width: 0.7, bgcolor: 'common.white' }}
            variant="outlined"
          >
            해제하기
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

  useEffect(() => {
    if (unlinkAction.status === 'success') {
      dispatch(fetchLinkedAccountList(currentUserSeq));
    }
  }, [unlinkAction.status]);

  const handleUnlinkStoreClick = e => {
    dispatch(
      unlinkStoreToMiddleAccount({
        userSeq: currentUserSeq,
        storeList: [e.currentTarget.id],
      }),
    );
  };

  const handleMoveAddLinkStore = () => {
    navigate('linked-store');
    /*
      userSeq를 알 수 없기 때문에 구현이 불가능할 것으로 보임
     */
  };

  const handleChangeSelect = e => {
    setSearchMenuIndex(e.target.value);
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" py={5}>
        <Grid item xs>
          <Typography fontSize="32px" fontWeight={700}>
            중간관리자[연동된 매장]
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" onClick={handleMoveAddLinkStore}>
            <Typography fontSize="14px">신규 매장 연동 추가</Typography>
          </Button>
        </Grid>
      </Grid>

      <Grid container alignItems="center" columnSpacing={3} mb={4}>
        <Grid item xs={2}>
          <SearchSelect
            searchMenuIndex={searchMenuIndex}
            onChange={handleChangeSelect}
            dataset={['전체', 'CMS ID', '중간관리자명', '이메일']}
          />
        </Grid>

        <Grid item xs>
          <SearchBar role={2} />
        </Grid>
      </Grid>

      <Table
        columns={columns}
        rows={linkedAccount.list}
        getRowId={row => row.storeId}
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
