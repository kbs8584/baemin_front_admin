import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, InputBase } from '@mui/material';
import { useEffect, useState } from 'react';
import ShowCreatedId from './ShowCreatedId';
import { signUp } from 'api/auth';
import { checkDuplicateId, getStoreIdAndEmail } from 'api/user';
import { useNavigate } from 'react-router';

import { Button } from 'components/Atoms';
import { InputField } from 'components/Molecules';
import { fetchStoreNameAndEmail, setCMSInputValue } from 'store/account';

export default function CreateId() {
  const cmsAdmin = useSelector(state => state.account.cmsAdmin);

  const [dialogOpen, setDialogOpen] = useState(true);
  const [storeNameValue, setStoreNameValue] = useState('');
  const [storeEmailValue, setStoreEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [CMSIdValue, setCMSIdValue] = useState('');
  const [storeIdValue, setStoreIdValue] = useState('');

  const [availableId, setAvailableId] = useState([]);
  const [checkedCMSId, setCheckedCMSId] = useState(false);
  const [newIdCreated, setNewIdCreated] = useState(false);
  const [msg, setMsg] = useState('');
  const [emailMsgOn, setEmailMsgOn] = useState(false);

  const dispatch = useDispatch();

  const NO_EMAIL_MSG =
    '등록된 이메일이 없습니다. 매장 대표자 이메일 등록 후, CMS아이디 생성이 가능합니다.';

  useEffect(() => {
    setCheckedCMSId(false);
  }, []);

  const filterKey = (e, filter) => {
    const filteredKey = new RegExp(/[a-z0-9]/g);

    if (!filteredKey.test(filter)) {
      e.preventDefault();
      alert('CMS ID는 영문 소문자와 숫자만 입력가능합니다.');
    }
    if (filter === CMSIdValue) {
      if (filter.split('').length !== filter.match(filteredKey).length) {
        e.preventDefault();
        alert('CMS ID는 영문 소문자와 숫자만 입력가능합니다.');
      } else {
        handleCheckCMSIdButton(CMSIdValue);
      }
    }
  };

  const checkStoreId = async e => {
    const res = await getStoreIdAndEmail(storeIdValue);

    setEmailMsgOn(false);

    if (storeIdValue === '') return; // required

    if (res === '등록되지 않은 매장 ID입니다') {
      // 등록되지 않은 매장ID
      setStoreIdValue('');
      setAvailableId(true);
      setStoreNameValue('');
      setStoreEmailValue('');
      setMsg('입력하신 매장이 없습니다. ID를 확인 후 다시 입력해 주세요');

      return;
    }

    if (res === '가입된 매장 입니다.') {
      // 등록된 매장ID이며, 이미 CMS ID를 가지고 있는 매장
      setAvailableId(false);
      setStoreNameValue('');
      setStoreEmailValue('');
      setMsg('이미 가입된 매장 입니다.');

      return;
    }

    // 등록된 매장ID이며, CMS ID를 가지고 있지 않은 매장
    setAvailableId(true);
    setStoreNameValue(res.name);
    setMsg('');

    // But, Email등록이 안 되어있을때
    if (!res.email) {
      setEmailMsgOn(true);
      return;
    }

    setStoreEmailValue(res.email);
  };

  const handleCheckCMSIdButton = async CMSIdValue => {
    const res = await checkDuplicateId(CMSIdValue);
    const checked = res.idCheck;

    if (checked && CMSIdValue !== '') {
      setCheckedCMSId(true);
      alert('사용할 수 있는 아이디입니다.');
    }
    if (!checked) alert('이미 등록된 아이디입니다.');
  };

  const createCMSId = async () => {
    const formdata = new FormData();
    formdata.append('userId', CMSIdValue);
    formdata.append('password', passwordValue);
    formdata.append('email', storeEmailValue);
    formdata.append('storeId', storeIdValue);
    formdata.append('storeName', storeNameValue);
    formdata.append('role', '0');
    await signUp(formdata);
  };

  function createRandomPassword() {
    // 자동생성 비밀번호에 조합될 문자열
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordLength = 8;
    let randomPassword = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      randomPassword += chars.substring(randomNumber, randomNumber + 1);
    }

    setPasswordValue(randomPassword); // 암묵적 출력
  }

  function checkValuesBeforeSubmit() {
    if (
      storeIdValue === '' ||
      storeEmailValue === '' ||
      storeEmailValue === null ||
      storeEmailValue === undefined ||
      storeNameValue === '' ||
      CMSIdValue === '' ||
      passwordValue === ''
    ) {
      alert('모든 입력란을 작성해주세요.');
      return;
    }
    if (storeEmailValue) {
      alert(NO_EMAIL_MSG);
      return;
    }
    if (!checkedCMSId) alert('아이디 중복검사를 해주세요.');
  }

  function handleSubmitButton() {
    checkValuesBeforeSubmit();

    if (
      checkedCMSId &&
      storeIdValue !== '' &&
      storeNameValue !== '' &&
      storeEmailValue !== '' &&
      storeEmailValue !== null &&
      storeEmailValue !== undefined &&
      (storeEmailValue !== CMSIdValue) !== '' &&
      passwordValue !== ''
    ) {
      createCMSId();
      setCheckedCMSId(false);
      setDialogOpen(true);
      setNewIdCreated(true);
    }
  }

  function setInfoWithInputValue(e, setFunc) {
    setFunc(e.target.value);
  }

  const handleChangeInput = e => {
    const { name, value } = e.target;

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

      <Grid container xs={9}>
        <Grid item xs={12} pb={1}>
          <InputField
            type="number"
            title="매장 ID"
            name="storeId"
            placeholder="매장 ID를 입력후 키보드의 엔터키를 입력해주세요."
            hasButton
            buttonName="확인"
            onChangeInput={handleChangeInput}
            onClickButton={handleCheckHasStoreAccount}
          />
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField
            title="매장명"
            defaultInputValue={storeNameValue}
            disabled
          />
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField
            title="매장이메일"
            defaultInputValue={emailMsgOn ? NO_EMAIL_MSG : storeEmailValue}
            disabled
          />
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField
            title="CMS ID"
            placeholder="ID를 입력해주세요."
            hasButton
            buttonName="중복검사"
            onChangeInput={e => setInfoWithInputValue(e, setStoreEmailValue)}
            onClickButton={e => filterKey(e, CMSIdValue)}
          />
        </Grid>

        <Grid item xs={12} pb={1}>
          <InputField
            type="password"
            title="비밀번호"
            value={passwordValue}
            placeholder="비밀번호를 입력해주세요."
            hasButton
            buttonName="자동생성"
            onChangeInput={e => setInfoWithInputValue(e, setPasswordValue)}
            onClickButton={createRandomPassword}
          />
        </Grid>

        <Grid item xs={12} pb={1}>
          <Button
            variant="contained"
            onClick={handleSubmitButton}
            disabled={!availableId}
          >
            <Typography py={1}>
              {availableId
                ? '신규 CMS ID 생성'
                : 'CMS에 이미 가입되어있는 매장입니다'}
            </Typography>
          </Button>
        </Grid>
      </Grid>

      <Box>
        <Box mb={1.3}>
          <Grid
            container
            height={75}
            sx={{
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: '5px',
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '200px',
                height: 1,
                fontWeight: 'fontWeight',
                borderRadius: '5px 0 0 5px',
              }}
            >
              매장이메일
            </Typography>
            <InputBase
              placeholder=""
              value={emailMsgOn ? NO_EMAIL_MSG : storeEmailValue}
              disabled
              sx={{
                width: 'calc(100% - 210px)',
                paddingLeft: 3,
                fontSize: '0.9rem',
                '& .Mui-disabled': {
                  WebkitTextFillColor: emailMsgOn
                    ? '#e03131'
                    : 'rgba(0,0,0,0.87)',
                  fontSize: emailMsgOn && '0.8rem',
                },
              }}
              onChange={e => setInfoWithInputValue(e, setStoreEmailValue)}
            />
          </Grid>
        </Box>

        <Box mb={1.3}>
          <Grid
            container
            height={75}
            sx={{
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: '5px',
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '200px',
                height: 1,
                fontWeight: 'fontWeight',
                borderRadius: '5px 0 0 5px',
              }}
            >
              CMS ID
            </Typography>
            <InputBase
              placeholder="ID를 입력해주세요"
              type="text"
              sx={{
                width: 'calc(100% - 410px)',
                paddingLeft: 3,
                fontSize: '0.9rem',
              }}
              onChange={e => {
                setInfoWithInputValue(e, setCMSIdValue);
              }}
              onKeyDown={e => filterKey(e, e.key)}
            />
            <Button
              variant="outlined"
              sx={{
                width: '110px',
                marginRight: 3,
                marginLeft: 'auto',
                border: '2px solid',
              }}
              onClick={e => {
                filterKey(e, CMSIdValue);
              }}
            >
              중복검사
            </Button>
          </Grid>
        </Box>

        <Box mb={1.3}>
          <Grid
            container
            height={75}
            sx={{
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: '5px',
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '200px',
                height: 1,
                fontWeight: 'fontWeight',
                borderRadius: '5px 0 0 5px',
              }}
            >
              패스워드
            </Typography>
            <InputBase
              placeholder="패스워드를 입력해주세요"
              sx={{
                width: 'calc(100% - 410px)',
                paddingLeft: 3,
                fontSize: '0.9rem',
              }}
              value={passwordValue}
              onChange={e => setInfoWithInputValue(e, setPasswordValue)}
            />
            <Button
              variant="outlined"
              sx={{
                width: '110px',
                marginRight: 3,
                marginLeft: 'auto',
                border: '2px solid',
              }}
              onClick={createRandomPassword}
            >
              자동생성
            </Button>
          </Grid>
        </Box>

        <Button
          fullWidth
          variant="contained"
          disabled={availableId ? false : true}
          sx={{
            height: 45,
            padding: 4,
            marginTop: 1,
            fontSize: 'bigButton.fontSize',
            fontWeight: 'fontWeight',
          }}
          onClick={handleSubmitButton}
        >
          {availableId
            ? '신규 CMS ID 생성'
            : 'CMS에 이미 가입되어있는 매장입니다'}
        </Button>
      </Box>
    </>
  );
}
