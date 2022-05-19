import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  InputBase,
} from "@mui/material";
import { useState } from "react";
import { ShowCreatedId } from "components/Modal";

export default function CreateId() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notAvailableId, setNotAvailableId] = useState(false);
  return (
    <Container sx={{ marginBottom: 18 }}>
      <ShowCreatedId dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
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
            ></InputBase>
            <Button
              variant="outlined"
              sx={{
                width: "110px",
                marginRight: 3,
                marginLeft: "auto",
                border: "2px solid",
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
            ></InputBase>
            <Button
              variant="outlined"
              sx={{
                width: "110px",
                marginRight: 3,
                marginLeft: "auto",
                border: "2px solid",
              }}
            >
              자동생성
            </Button>
          </Grid>
        </Box>
        <Button
          fullWidth
          variant="contained"
          disabled={notAvailableId ? true : false}
          sx={{
            height: 45,
            padding: 4,
            marginTop: 1,
            fontSize: "bigButton.fontSize",
            fontWeight: "fontWeight",
          }}
          onClick={() => setDialogOpen(true)}
        >
          {notAvailableId
            ? "CMS에 이미 가입되어있는 매장입니다"
            : "신규 CMS ID 생성"}
        </Button>
      </Box>
    </Container>
  );
}
