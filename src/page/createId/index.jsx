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
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 1,
                fontWeight: "fontWeight",
              }}
            >
              매장 ID
            </Typography>
            <InputBase
              placeholder="매장 ID를 검색해주세요"
              sx={{ paddingLeft: 3, fontSize: "0.9rem" }}
            ></InputBase>
            <Button
              variant="outlined"
              sx={{ marginRight: 3, marginLeft: "auto", border: "2px solid" }}
            >
              검색
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
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 1,
                fontWeight: "fontWeight",
              }}
            >
              매장명
            </Typography>
            <InputBase placeholder="" sx={{ paddingLeft: 3 }}></InputBase>
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
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 1,
                fontWeight: "fontWeight",
              }}
            >
              CMS ID
            </Typography>
            <InputBase
              placeholder="ID를 입력해주세요"
              sx={{ paddingLeft: 3, fontSize: "0.9rem" }}
            ></InputBase>
            <Button
              variant="outlined"
              sx={{ marginRight: 3, marginLeft: "auto", border: "2px solid" }}
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
            }}
          >
            <Typography
              bgcolor="grey.100"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 1,
                fontWeight: "fontWeight",
              }}
            >
              패스워드
            </Typography>
            <InputBase
              placeholder="패스워드를 검색해주세요"
              sx={{ paddingLeft: 3, fontSize: "0.9rem" }}
            ></InputBase>
            <Button
              variant="outlined"
              sx={{ marginRight: 3, marginLeft: "auto", border: "2px solid" }}
            >
              자동생성
            </Button>
          </Grid>
        </Box>
        <Button
          fullWidth
          variant="contained"
          sx={{
            height: 45,
            padding: 4,
            marginTop: 1,
            fontSize: "bigButton.fontSize",
            fontWeight: "fontWeight",
          }}
          onClick={() => setDialogOpen(true)}
        >
          신규 CMS ID 생성
        </Button>
      </Box>
    </Container>
  );
}
