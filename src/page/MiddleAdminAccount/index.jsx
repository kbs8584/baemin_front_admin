import { useDispatch, useSelector } from 'react-redux';

import { Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import IssuedAccount from 'page/MiddleAdmin/IssuedAccount';

import Dialog from 'components/Atoms/Dialog';
import { Button } from 'components/Atoms';
import { InputField } from 'components/Molecules';

import { setIsOpenDialog } from 'store/app';

export default function MiddleAdminAccount() {
  const isOpen = useSelector(
    ({ app }) => app.isOpenDialog.resultOfIssueMiddleAdminId,
  );

  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    dispatch(
      setIsOpenDialog({
        name: 'resultOfIssueMiddleAdminId',
        status: true,
      }),
    );
  };

  const handleCloseDialog = () => {
    dispatch(
      setIsOpenDialog({
        name: 'resultOfIssueMiddleAdminId',
        status: false,
      }),
    );
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        {/* TODO: CMS ID 생성 Dialog과 합칠 것 -> 데이터만 다른거 넣을 수 있게 */}
        <IssuedAccount onClose={handleCloseDialog} />
      </Dialog>

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

      <Grid container>
        <Grid item xs={9} pb={1}>
          <InputField
            title="중간관리자 ID"
            placeholder="ID를 입력해주세요"
            hasButton
            buttonName="중복검사"
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="관리자명"
            placeholder="관리자명을 입력해주세요."
            hasButton
            buttonName="중복검사"
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="이메일"
            placeholder="대표이메일을 입력해주세요."
            hasButton
            buttonName="중복검사"
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            hasButton
            buttonName="자동생성"
          />
        </Grid>

        <Grid item xs={9}>
          <Button variant="contained" onClick={handleOpenDialog}>
            <Typography fontWeight={900} py={1}>
              신규 중간관리자 ID 생성
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
