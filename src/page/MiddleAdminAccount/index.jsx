import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import IssuedAccount from 'page/MiddleAdmin/IssuedAccount';

import Dialog from 'components/Atoms/Dialog';
import { Button } from 'components/Atoms';
import { InputField } from 'components/Molecules';

import { setIsOpenDialog } from 'store/app';
import {
  checkIsFieldDuplicated,
  createAccount,
  setMiddleAdminInputValue,
  setCanCreateAccount,
} from 'store/account';

export default function MiddleAdminAccount() {
  const middleAdmin = useSelector(state => state.account.middleAdmin);
  const isSuccess = useSelector(state => state.account.isSuccessCreateAccount);
  const canCreateAccount = useSelector(state => state.account.canCreateAccount);
  const isOpen = useSelector(
    ({ app }) => app.isOpenDialog.resultOfIssueMiddleAdminId,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      middleAdmin.password &&
      inspectDuplicatedCheckAllTrue(middleAdmin.duplicatedCheck)
    ) {
      dispatch(setCanCreateAccount(true));
    }
  }, [middleAdmin.duplicatedCheck, middleAdmin.password]);

  useEffect(() => {
    if (isSuccess) {
      handleOpenDialog();
    }
  }, [isSuccess]);

  const handleCheckIsDuplicated = e => {
    dispatch(
      checkIsFieldDuplicated({
        name: e.target.name,
        value: middleAdmin[e.target.name],
      }),
    );
  };

  const handleGenerateRandomPassword = () => {
    dispatch(
      setMiddleAdminInputValue({
        name: 'password',
        value: getRandomPassword(),
      }),
    );
  };

  const handleChangeInput = e => {
    let { name, value } = e.target;

    dispatch(
      setMiddleAdminInputValue({
        name: name,
        value: value,
      }),
    );
  };

  const handleCreateAccount = () => {
    const form = new FormData();

    form.append('userId', middleAdmin.id);
    form.append('password', middleAdmin.password);
    form.append('storeId', 0);
    form.append('storeName', middleAdmin.name);
    form.append('email', middleAdmin.email);
    form.append('role', '2');

    dispatch(createAccount(form));
  };

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

      <Grid container alignItems="center" my={4}>
        <Grid item>
          <IconButton>
            <ArrowBackIosNewIcon
              sx={{ color: 'common.black' }}
              transform="scale(1.2)"
            />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography fontSize="32px" fontWeight={900}>
            중간관리자 ID 생성
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={9} pb={1}>
          <InputField
            title="중간관리자 ID"
            placeholder="ID를 입력해주세요"
            name="id"
            hasButton
            buttonName="중복검사"
            onChangeInput={handleChangeInput}
            onClickButton={handleCheckIsDuplicated}
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="관리자명"
            name="name"
            placeholder="관리자명을 입력해주세요."
            hasButton
            buttonName="중복검사"
            onChangeInput={handleChangeInput}
            onClickButton={handleCheckIsDuplicated}
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="이메일"
            name="email"
            placeholder="대표이메일을 입력해주세요."
            hasButton
            buttonName="중복검사"
            onChangeInput={handleChangeInput}
            onClickButton={handleCheckIsDuplicated}
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="비밀번호"
            name="password"
            value={middleAdmin.password}
            placeholder="비밀번호를 입력해주세요."
            hasButton
            buttonName="자동생성"
            onChangeInput={handleChangeInput}
            onClickButton={handleGenerateRandomPassword}
          />
        </Grid>

        <Grid item xs={9}>
          <Button
            disabled={!canCreateAccount}
            variant="contained"
            onClick={handleCreateAccount}
          >
            <Typography fontWeight={900} py={1}>
              신규 중간관리자 ID 생성
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

const inspectDuplicatedCheckAllTrue = obj =>
  Object.values(obj).every(value => value === true);

const getRandomPassword = () => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = 8;
  let randomPassword = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    randomPassword += chars.substring(randomNumber, randomNumber + 1);
  }

  return randomPassword;
};
