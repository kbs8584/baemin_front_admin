import { useState } from "react";
import { Grid, CardMedia, Typography, Divider, Container } from "@mui/material";

import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import MessageIcon from "@mui/icons-material/Message";

import FooterLogo from "assets/main_logo_gray.PNG";
import { Message } from "@mui/icons-material";

export default function Footer() {
  const [item, setItem] = useState([]);

  return (
    <Container>
      <Grid
        container
        justifyContent="space-between"
        sx={{ position: "sticky", bottom: 0, bgcolor: "#ffffff" }}
      >
        <Grid container xs item>
          <Grid item xs={4} p={3}>
            <CardMedia
              component="img"
              src={FooterLogo}
              sx={{ maxWidth: "100px" }}
            />
          </Grid>
          <Grid
            container
            item
            xs={8}
            p={3}
            sx={{
              "& hr": {
                mx: 0.8,
              },
            }}
          >
            <Grid container>
              <Typography>회사소개</Typography>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <Typography>배달의 민족</Typography>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <Typography fontWeight="bold">개인정보처리방침</Typography>
            </Grid>
            <Grid container pt={2}>
              <Typography>소비자중심경영</Typography>
              <Typography>정보보호 관리체계 인증</Typography>
            </Grid>
            <Grid container pt={4}>
              <Typography fontWeight="bold">
                (주)우아한형제들 자세히보기 ▾
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs item justifyContent="end" pt={3}>
          <Grid>
            <select name="a" id="a" style={{ padding: "8px" }}>
              <option value="사장님 서비스">사장님 서비스</option>
              <option value="Menu 1">Menu 1</option>
              <option value="Menu 2">Menu 2</option>
              <option value="Menu 3">Menu 3</option>
            </select>
          </Grid>
          <Grid container justifyContent="end" gap={2}>
            <FacebookIcon />
            <YouTubeIcon />
            <MessageIcon />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
