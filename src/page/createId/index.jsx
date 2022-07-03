import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Grid, Typography } from '@mui/material';

import ShowCreatedId from './ShowCreatedId';
import { signUp } from 'api/auth';

import { Button } from 'components/Atoms';
import { InputField } from 'components/Molecules';
import {
  initErrorMessage,
  checkIsDuplicatedAccountId,
  fetchStoreNameAndEmail,
  setCanCreateAccount,
  setCMSInputValue,
  createAccount,
} from 'store/account';

export default function CreateId() {
  const cmsAdmin = useSelector(state => state.account.cmsAdmin);
  const isSuccess = useSelector(state => state.account.isSuccessCreateAccount);
  const canCreateAccount = useSelector(state => state.account.canCreateAccount);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cmsAdmin.errorMessage) {
      alert(cmsAdmin.errorMessage);
    }

    return () => {
      dispatch(initErrorMessage());
    };
  }, [cmsAdmin.errorMessage]);

  useEffect(() => {
    const field = {
      0: cmsAdmin.storeId,
      1: cmsAdmin.storeName,
      2: cmsAdmin.storeEmail,
      3: cmsAdmin.password,
    };

    if (checkAllFieldFilledOut(field) && cmsAdmin.duplicatedCheck) {
      dispatch(setCanCreateAccount(true));
    }
  }, [cmsAdmin]);

  const handleCheckIsDuplicatedAccountId = () => {
    if (!cmsAdmin.id) {
      alert('ID를 입력해주세요.');

      return;
    }

    dispatch(checkIsDuplicatedAccountId(cmsAdmin.id));
  };

  const handleCreateAccount = () => {
    const form = new FormData();

    form.append('userId', cmsAdmin.id);
    form.append('password', cmsAdmin.password);
    form.append('email', cmsAdmin.storeEmail);
    form.append('storeId', cmsAdmin.storeId);
    form.append('storeName', cmsAdmin.storeEmail);
    form.append('role', '1');

    dispatch(createAccount(form));
  };

  const handleGenerateRandomPassword = () => {
    dispatch(
      setCMSInputValue({
        name: 'password',
        value: getRandomPassword(),
      }),
    );
  };

  const handleChangeInput = e => {
    let { name, value } = e.target;

    if (name === 'id' && !inspectCMSAccountId(value)) {
      value = '';

      alert('ID는 영어소문자 또는 숫자만 가능합니다.');
    }

    dispatch(
      setCMSInputValue({
        name: name,
        value: value,
      }),
    );
  };

  const handleCheckHasStoreAccount = () => {
    if (!cmsAdmin.storeId) {
      alert('매장 ID를 입력해주세요.');

      return;
    }

    dispatch(fetchStoreNameAndEmail(cmsAdmin.storeId));
  };

  return (
    <>
      {/*
          <ShowCreatedId
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            storeId={storeIdValue}
            CMSId={CMSIdValue}
            storeName={storeNameValue}
            storeEmail={storeEmailValue}
            password={passwordValue}
            setStoreIdValue={setStoreIdValue}
            newIdCreated={newIdCreated}
          />
        */}

      <Typography
        variant="h1"
        mt={6}
        mb={5}
        sx={{ fontSize: 'subtitle1.fontSize' }}
      >
        CMS ID 생성
      </Typography>

      <Grid container>
        <Grid item xs={9} pb={1}>
          <InputField
            type="number"
            title="매장 ID"
            value={cmsAdmin.storeId}
            name="storeId"
            placeholder="매장 ID를 입력해주세요."
            hasButton
            buttonName="확인"
            onChangeInput={handleChangeInput}
            onClickButton={handleCheckHasStoreAccount}
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField title="매장명" value={cmsAdmin.storeName} disabled />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField title="매장이메일" value={cmsAdmin.storeEmail} disabled />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="CMS ID"
            value={cmsAdmin.id}
            name="id"
            placeholder="ID를 입력해주세요."
            hasButton
            buttonName="중복검사"
            onChangeInput={handleChangeInput}
            onClickButton={handleCheckIsDuplicatedAccountId}
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <InputField
            title="비밀번호"
            value={cmsAdmin.password}
            name="password"
            placeholder="비밀번호를 입력해주세요."
            hasButton
            buttonName="자동생성"
            onChangeInput={handleChangeInput}
            onClickButton={handleGenerateRandomPassword}
          />
        </Grid>

        <Grid item xs={9} pb={1}>
          <Button
            variant="contained"
            disabled={!canCreateAccount}
            onClick={handleCreateAccount}
          >
            <Typography fontWeight={900} py={1}>
              {cmsAdmin.errorMessage === '가입된 매장입니다.'
                ? 'CMS에 이미 가입되어 있는 매장입니다.'
                : '신규 CMS ID 생성'}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

const checkAllFieldFilledOut = obj =>
  Object.values(obj).every(value => value !== '');

const inspectCMSAccountId = str => new RegExp(/^[a-z0-9]*$/).test(str);

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
