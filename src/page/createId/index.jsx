import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  InputBase,
} from "@mui/material";
import { useEffect, useState } from "react";
import ShowCreatedId from "./ShowCreatedId";
import { inputValueArray } from "constant/inputValue";
import { signUp, checkDuplicateId } from "api/auth";
import { getStoreList } from "store/storeList";
import { useDispatch, useSelector } from "react-redux";

export default function CreateId() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [storeNameValue, setStoreNameValue] = useState("");
  const [storeEmailValue, setStoreEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [CMSIdValue, setCMSIdValue] = useState("");
  const [storeIdValue, setStoreIdValue] = useState("");
  const [checkedStoreId, setCheckedStoreId] = useState([]);
  const [checkedCMSId, setCheckedCMSId] = useState(false);
  const storeDataFromDB = useSelector((state) => state.storeList.storeData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStoreList());
  }, []);

  useEffect(() => {
    setCheckedCMSId(false);
  }, []);

  const checkStoreId = (e) => {
    const checked = storeDataFromDB.filter((store) => {
      return e.target.value === store.storeId.toString();
    });
    setCheckedStoreId(checked);
    console.log(checkedStoreId);
    setInfoWithInputValue(e, setStoreIdValue);
  };
  const handleCheckCMSIdButton = async (CMSIdValue) => {
    const res = await checkDuplicateId(CMSIdValue);
    const checked = res.idCheck;
    if (checked && CMSIdValue !== "") {
      setCheckedCMSId(true);
      alert("사용할 수 있는 아이디입니다.");
    }
    if (!checked) alert("이미 등록된 아이디입니다.");
  };
  const createCMSId = async () => {
    const formdata = new FormData();
    formdata.append("userId", CMSIdValue);
    formdata.append("password", passwordValue);
    formdata.append("email", storeEmailValue);
    formdata.append("storeId", storeIdValue);
    formdata.append("storeName", `${storeNameValue}`);
    formdata.append("role", "0");
    await signUp(formdata);
  };
  function createRandomPassword() {
    // 자동생성 비밀번호에 조합될 문자열
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 8;
    let randomPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      randomPassword += chars.substring(randomNumber, randomNumber + 1);
    }
    setPasswordValue(randomPassword);
  }
  function checkCMSId() {
    if (!checkedCMSId) alert("아이디 중복검사를 해주세요.");
  }
  function handleSubmitButton() {
    checkCMSId();
    if (
      checkedCMSId &&
      storeIdValue !== "" &&
      storeNameValue !== "" &&
      storeEmailValue !== "" &&
      CMSIdValue !== "" &&
      passwordValue !== null
    ) {
      createCMSId();
      setDialogOpen(true);
    }
  }
  function setInfoWithInputValue(e, setFunc) {
    setFunc(e.target.value);
  }

  return (
    <Container sx={{ marginBottom: 18 }}>
      <ShowCreatedId
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        storeId={storeIdValue}
        CMSId={CMSIdValue}
        storeName={storeNameValue}
        storeEmail={storeEmailValue}
        password={passwordValue}
      />
      <Typography
        variant="h1"
        mt={6}
        mb={5}
        sx={{ fontSize: "subtitle1.fontSize" }}
      >
        CMS ID 생성
      </Typography>
      <Box width="80%">
        <Box mb={1.3}>
          <Grid
            container
            height={75}
            sx={{
              alignItems: "center",
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: "5px",
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
                height: 1,
                fontWeight: "fontWeight",
                borderRadius: "5px 0 0 5px",
              }}
            >
              매장 ID
            </Typography>
            <InputBase
              placeholder="매장 ID를 입력후 키보드의 엔터키를 입력해주세요"
              sx={{
                width: "calc(100% - 410px)",
                paddingLeft: 3,
                fontSize: "0.9rem",
              }}
              onChange={(e) => {
                checkStoreId(e);
                setInfoWithInputValue(e, setStoreIdValue);
              }}
            ></InputBase>
          </Grid>
        </Box>
        <Box mb={1.3}>
          <Grid
            container
            height={75}
            sx={{
              alignItems: "center",
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: "5px",
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
                height: 1,
                fontWeight: "fontWeight",
                borderRadius: "5px 0 0 5px",
              }}
            >
              매장명
            </Typography>
            <InputBase
              placeholder=""
              sx={{ width: "calc(100% - 410px)", paddingLeft: 3 }}
              onChange={(e) => setInfoWithInputValue(e, setStoreNameValue)}
            ></InputBase>
          </Grid>
        </Box>
        <Box mb={1.3}>
          <Grid
            container
            height={75}
            sx={{
              alignItems: "center",
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: "5px",
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
                height: 1,
                fontWeight: "fontWeight",
                borderRadius: "5px 0 0 5px",
              }}
            >
              매장이메일
            </Typography>
            <InputBase
              placeholder=""
              sx={{ width: "calc(100% - 410px)", paddingLeft: 3 }}
              onChange={(e) => setInfoWithInputValue(e, setStoreEmailValue)}
            ></InputBase>
          </Grid>
        </Box>
        <Box mb={1.3}>
          <Grid
            container
            height={75}
            sx={{
              alignItems: "center",
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: "5px",
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
                height: 1,
                fontWeight: "fontWeight",
                borderRadius: "5px 0 0 5px",
              }}
            >
              CMS ID
            </Typography>
            <InputBase
              placeholder="ID를 입력해주세요"
              sx={{
                width: "calc(100% - 410px)",
                paddingLeft: 3,
                fontSize: "0.9rem",
              }}
              onChange={(e) => setInfoWithInputValue(e, setCMSIdValue)}
            ></InputBase>
            <Button
              variant="outlined"
              sx={{
                width: "110px",
                marginRight: 3,
                marginLeft: "auto",
                border: "2px solid",
              }}
              onClick={() => handleCheckCMSIdButton(CMSIdValue)}
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
              alignItems: "center",
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: "5px",
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
                height: 1,
                fontWeight: "fontWeight",
                borderRadius: "5px 0 0 5px",
              }}
            >
              패스워드
            </Typography>
            <InputBase
              placeholder="패스워드를 입력해주세요"
              sx={{
                width: "calc(100% - 410px)",
                paddingLeft: 3,
                fontSize: "0.9rem",
              }}
              value={passwordValue}
              onChange={(e) => setInfoWithInputValue(e, setPasswordValue)}
            ></InputBase>
            <Button
              variant="outlined"
              sx={{
                width: "110px",
                marginRight: 3,
                marginLeft: "auto",
                border: "2px solid",
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
          disabled={checkedStoreId.length !== 0 ? true : false}
          sx={{
            height: 45,
            padding: 4,
            marginTop: 1,
            fontSize: "bigButton.fontSize",
            fontWeight: "fontWeight",
          }}
          onClick={handleSubmitButton}
        >
          {checkedStoreId.length !== 0
            ? "CMS에 이미 가입되어있는 매장입니다"
            : "신규 CMS ID 생성"}
        </Button>
      </Box>
    </Container>
  );
}
