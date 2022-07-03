import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Typography,
  Select,
  MenuItem,
  Grid,
  Box,
  FormControl,
} from '@mui/material';

import { Button } from 'components/Atoms';
import { SearchBar } from 'components/Molecules';
import Table from 'components/Table';

import { fetchNotLinkedAccountList, setSearchText } from 'store/manage';

export default function MiddleAdmin() {
  const middleAdmin = useSelector(state => state.manage.middleAdmin);

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

  const handleMoveIssueAccount = () => {
    navigate('create-id');
  };

  const handleAddStoreClick = e => {
    dispatch(fetchNotLinkedAccountList(e.target.id));
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" py={5}>
        <Grid item>
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
          <FormControl fullWidth>
            <Select
              variant="outlined"
              value={searchMenuIndex}
              onChange={e => setSearchMenuIndex(e.target.value)}
              fullWidth
              sx={{
                bgcolor: 'grey.100',
                borderRadius: '30px',
                textAlign: 'center',

                '& .MuiSelect-outlined': {
                  p: 1,
                },
              }}
            >
              <MenuItem value={0}>전체</MenuItem>
              <MenuItem value={1}>CMS ID</MenuItem>
              <MenuItem value={2}>중간관리자명</MenuItem>
              <MenuItem value={3}>이메일</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs>
          <SearchBar role={2} />
        </Grid>
      </Grid>

      <Box
        mb={5}
        sx={{
          width: 1,
          height: '649px',

          '& .super-app-theme--header': {
            borderBottom: 6,
            fontSize: '1rem',
          },
          '& .super-app-theme--header:nth-of-type(1)': {
            paddingLeft: 5,
          },
        }}
      >
        <Table columns={columns} rows={middleAdmin.list} />
      </Box>
    </>
  );
}
