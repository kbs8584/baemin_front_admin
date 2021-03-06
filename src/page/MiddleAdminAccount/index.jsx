import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  IconButton,
  Typography,
  Snackbar,
  Fade,
  Alert as _Alert,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import IssuedAccount from 'page/MiddleAdmin/IssuedAccount';

import Dialog from 'components/Atoms/Dialog';
import { Button } from 'components/Atoms';
import { InputField } from 'components/Molecules';

import { setIsOpenDialog } from 'store/app';
import {
  initDuplicatedCheckStatus,
  checkIdIsDuplicated,
  checkEmailIsDuplicated,
  createAccount,
  setMiddleAdminInputValue,
  setCanCreateAccount,
  initializeState,
} from 'store/account';
import { setSnackbar, setCloseSnackbar } from 'store/app';

const Alert = () => {
  const snackbar = useSelector(state => state.app.snackbar);
  const dispatch = useDispatch();

  const handleClose = (e, reason) => {
    if (reason === 'clickaway' || reason === 'escapeKeyDown') {
      return;
    }

    dispatch(setCloseSnackbar());
  };

  return (
    <Snackbar
      open={snackbar.open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      TransitionComponent={Fade}
      autoHideDuration={4000}
      message={<Typography>{snackbar.message}</Typography>}
    >
      <_Alert icon={false} variant="filled" color="primary">
        {snackbar.message}
      </_Alert>
    </Snackbar>
  );
};

export default function MiddleAdminAccount() {
  const middleAdmin = useSelector(state => state.account.middleAdmin);
  const { status, id, email, message } = useSelector(
    state => state.account.middleAdmin.duplicatedCheck,
  );
  const isSuccess = useSelector(state => state.account.isSuccessCreateAccount);
  const canCreateAccount = useSelector(state => state.account.canCreateAccount);
  const isOpen = useSelector(
    ({ app }) => app.isOpenDialog.resultOfIssueMiddleAdminId,
  );

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (middleAdmin.password && id && email) {
      dispatch(setCanCreateAccount(true));
    }
  }, [id, email, middleAdmin.password]);

  useEffect(() => {
    if (isSuccess) {
      handleOpenDialog();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (status === 'success') {
      // alert(middleAdmin.duplicatedCheck.message);

      dispatch(
        setSnackbar({
          open: true,
          message: message,
        }),
      );

      dispatch(initDuplicatedCheckStatus());
    }
  }, [status]);

  const handleIdIsDuplicated = e => {
    dispatch(
      checkIdIsDuplicated({
        userId: middleAdmin[e.target.name],
      }),
    );
  };

  const handleCheckEmailIsDuplicated = e => {
    dispatch(
      checkEmailIsDuplicated({
        email: middleAdmin[e.target.name],
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

  const handleMoveBackward = () => {
    navigate(-1);
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

    initializeMiddleAdminState();
  };

  const initializeMiddleAdminState = () => {
    dispatch(
      initializeState({
        name: 'middleAdmin',
      }),
    );
    dispatch(setCanCreateAccount(false));
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        {/* TODO: CMS ID ?????? Dialog??? ?????? ??? -> ???????????? ????????? ?????? ??? ?????? */}
        <IssuedAccount onClose={handleCloseDialog} />
      </Dialog>

      <Alert />

      <Grid container alignItems="center" my={4}>
        <Grid item>
          <IconButton onClick={handleMoveBackward}>
            <ArrowBackIosNewIcon
              sx={{ color: 'common.black' }}
              transform="scale(1.2)"
            />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography fontSize="32px" fontWeight={900}>
            ??????????????? ID ??????
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={9} pb={1}>
          <InputField
            title="??????????????? ID"
            placeholder="ID??? ??????????????????"
            value={middleAdmin.id}
            name="id"
            hasButton
            buttonName="????????????"
            error
            onChangeInput={handleChangeInput}
            onClickButton={handleIdIsDuplicated}
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="????????????"
            placeholder="??????????????? ??????????????????."
            value={middleAdmin.name}
            name="name"
            onChangeInput={handleChangeInput}
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="?????????"
            placeholder="?????????????????? ??????????????????."
            value={middleAdmin.email}
            name="email"
            hasButton
            buttonName="????????????"
            onChangeInput={handleChangeInput}
            onClickButton={handleCheckEmailIsDuplicated}
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="????????????"
            placeholder="??????????????? ??????????????????."
            value={middleAdmin.password}
            name="password"
            hasButton
            buttonName="????????????"
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
              ?????? ??????????????? ID ??????
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
