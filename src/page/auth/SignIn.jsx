import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUser, getUser } from "store/auth";

import {
  Grid,
  Box,
  CardMedia,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";
import MainLogo from "assets/main_logo.png";
import { useNavigate } from "react-router";
import { setUser } from "store/auth";
import { getUsersInfo } from "api/auth";

export default function SignIn() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [checkIdAndPassword, setCheckIdAndPassword] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const getUserStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    dispatch(
      getUser({
        userId,
        password,
      })
    );
    setCheckIdAndPassword(true);
  };

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("TOKEN", user.token);
      navigate("/");
    }
  }, [user]);

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid
        item
        borderRadius="borderRadius"
        sx={{ border: "1px solid #DDDDDD" }}
        p={3}
      >
        <Grid container justifyContent="center">
          <CardMedia
            component="img"
            src={MainLogo}
            sx={{ maxWidth: "150px" }}
          />
        </Grid>

        <Typography
          sx={{ color: "#222222" }}
          align="center"
          pt={3}
          pb={1}
          fontSize="30px"
          fontWeight={400}
        >
          S로봇 관리자 페이지 어드민
        </Typography>
        <Box pt={4} pb={2} sx={{ borderRadius: "borderRadius" }}>
          <TextField
            fullWidth
            label="아이디"
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
        </Box>

        <Box pb={2}>
          <TextField
            fullWidth
            type="password"
            label="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
        </Box>
        {checkIdAndPassword && !user && getUserStatus !== "loading" && (
          <Box pb={1}>
            <Typography sx={{ fontSize: "0.8rem", color: "primary.alert" }}>
              아이디와 비밀번호를 확인해주세요.
            </Typography>
          </Box>
        )}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          pb={3}
        >
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="아이디 저장" />
          </FormGroup>
        </Grid>

        <Box pb={4}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ height: 50, bgcolor: "#1A7CFF" }}
            onClick={handleSubmit}
          >
            로그인
          </Button>
        </Box>

        <Typography sx={{ color: "#777777" }} fontSize="12px" align="center">
          © Woowa Brothers Crop.
        </Typography>
      </Grid>
    </Grid>
  );
}
