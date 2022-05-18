import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "store/auth";
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

export default function SignIn() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "succeeded") {
      // 인증된 상태로 메인화면 이동
    }

    await dispatch(
      getUser({
        userId: userId,
        password: password,
      })
    );
  };

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
          S로봇 관리자 페이지 ADMIN
        </Typography>
        <Box pt={4} pb={2} sx={{ borderRadius: "borderRadius" }}>
          <TextField
            fullWidth
            label="아이디"
            onChange={(e) => setUserId(e.target.value)}
          />
        </Box>

        <Box pb={2}>
          <TextField
            fullWidth
            type="password"
            label="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

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
