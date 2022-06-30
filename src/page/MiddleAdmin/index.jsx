import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Typography,
  Select,
  IconButton,
  MenuItem,
  Grid,
  InputBase,
  Box,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';

import SearchIcon from '@mui/icons-material/Search';

import { Button } from 'components/Atoms';
import { InputField } from 'components/Molecules';
import Dialog from 'components/Atoms/Dialog';

import { setIsOpenDialog } from 'store/app';

export default function MiddleAdmin({ children }) {
  const [searchMenuIndex, setSearchMenuIndex] = useState(0);

  useEffect(() => {}, []);

  const dispatch = useDispatch();

  const columns = [
    {
      field: 'userId',
      headerName: 'CMS ID',
      editable: false,
    },
    {
      field: 'middleAdminName',
      headerName: '중간관리자명',
      editable: false,
    },
    {
      field: 'email',
      headerName: '이메일',
      editable: false,
    },
    {
      field: 'addStore',
      headerName: '매장추가',
      editable: false,
    },
    {
      field: 'checkCMS',
      headerName: 'CMS 보기',
      editable: false,
    },
    {
      field: 'initPassword',
      headerName: '비밀번호 초기화',
      editable: false,
    },
  ];

  const handleOpenDialog = () => {
    dispatch(
      setIsOpenDialog({
        name: 'resultOfIssueMiddleAdminId',
        status: true,
      }),
    );
  };

  return (
    <>
      <Outlet />

      <IsuueAccountResultDialog />

      <Grid container justifyContent="space-between" alignItems="center" py={4}>
        <Grid item>
          <Typography fontSize="32px" fontWeight={700}>
            중간관리자
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained">
            <Typography fontSize="14px">신규 중간 관리자 ID 생성</Typography>
          </Button>
        </Grid>
      </Grid>

      <Grid container alignItems="center" columnSpacing={3}>
        <Grid item xs={2}>
          <Select
            value={searchMenuIndex}
            onChange={e => setSearchMenuIndex(e.target.value)}
            fullWidth
            sx={{
              bgcolor: 'grey.100',
              borderRadius: '30px',
              textAlign: 'center',
            }}
          >
            <MenuItem value={0}>전체</MenuItem>
            <MenuItem value={1}>CMS ID</MenuItem>
            <MenuItem value={2}>중간관리자명</MenuItem>
            <MenuItem value={3}>이메일</MenuItem>
          </Select>
        </Grid>

        <Grid item xs>
          <Grid
            container
            alignItems="center"
            sx={{
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: '30px',
            }}
          >
            <Grid item xs={0.6} sx={{ position: 'relative' }}>
              <SearchIcon
                sx={{
                  fontSize: '2rem',
                  position: 'absolute',
                  top: 0,
                  transform: 'translate(30%, -50%)',
                }}
              />
            </Grid>
            <Grid item xs>
              <InputBase fullWidth />
            </Grid>
            <Grid item xs={1}>
              <Button
                fullWidth
                sx={{ bgcolor: 'grey.200', borderRadius: '0 30px 30px 0' }}
              >
                <Typography color="common.black">검색</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container alignItems="center">
        <Grid item>
          <IconButton>
            <ArrowBackIosNewIcon
              sx={{ color: 'common.black' }}
              transform="scale(1.2)"
            />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography fontSize="32px" fontWeight={700}>
            중간관리자 ID 생성
          </Typography>
        </Grid>
      </Grid>

      <Grid container xs={9}>
        <Grid item xs={12} pb={1}>
          <InputField
            title="중간관리자 ID"
            placeholder="ID를 입력해주세요"
            hasButton
            buttonName="중복검사"
          />
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField
            title="관리자명"
            placeholder="관리자명을 입력해주세요."
            hasButton
            buttonName="중복검사"
          />
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField
            title="이메일"
            placeholder="대표이메일을 입력해주세요."
            hasButton
            buttonName="중복검사"
          />
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            hasButton
            buttonName="자동생성"
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleOpenDialog}>
            <Typography fontWeight={900} py={1}>
              신규 중간관리자 ID 생성
            </Typography>
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {/*<DataGrid columns={columns} rows={} />*/}
      </Grid>
    </>
  );
}

const IsuueAccountResultDialog = () => {
  // TODO: CMS ID 생성 Dialog과 합칠 것 -> 데이터만 다른거 넣을 수 있게

  const isOpen = useSelector(
    ({ app }) => app.isOpenDialog.resultOfIssueMiddleAdminId,
  );

  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    dispatch(
      setIsOpenDialog({
        name: 'resultOfIssueMiddleAdminId',
        status: false,
      }),
    );
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog}>
      <Box p={2}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography fontSize="20px" fontWeight={800}>
            아래 정보로 신규 ID 생성이 완료되었습니다.
          </Typography>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              top: 10,
              right: 5,
            }}
          >
            <CloseIcon sx={{ transform: 'scale(1.3)' }} />
          </IconButton>
        </Grid>

        {/*
        {MIDDLE_ADMIN_INPUTFIELD.map(({ title, placeholder }) => (
          <Grid item xs={12} pb={1} key={title}>
            <InputField title={title} placeholder={placeholder} />
          </Grid>
        ))}
        */}

        <Button variant="contained">
          <Typography fontWeight={900} py={1}>
            중간관리자 매장 연동하기
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};
