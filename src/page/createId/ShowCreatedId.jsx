import { Grid, Box, Typography, Button } from "@mui/material";
import Modal from "components/Modal";
import CloseIcon from "@mui/icons-material/Close";

export default function ShowCreatedId({
  dialogOpen,
  setDialogOpen,
  storeId,
  CMSId,
  storeName,
  storeEmail,
  password,
}) {
  function redirectToUserSite() {
    const token = sessionStorage.getItem("TOKEN");
    window.location.href = `http://localhost:3000/?storeId=${storeId}&user=${token}`;
  }

  return (
    <Modal fullWidth dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
      <Box sx={{ padding: 3 }}>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item component="h1" mb={4} sx={{ fontSize: "1.3rem" }}>
            아래 정보로 신규 ID 생성이 완료되었습니다.
          </Grid>
          <Grid item>
            <CloseIcon
              sx={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={() => {
                setDialogOpen(false);
              }}
            />
          </Grid>
        </Grid>

        <Box>
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
                  width: 140,
                  height: 1,
                  fontWeight: "fontWeight",
                  borderRadius: "5px 0 0 5px",
                }}
              >
                매장 ID
              </Typography>
              <Typography sx={{ paddingLeft: 3, fontSize: "0.9rem" }}>
                {} {storeId}
              </Typography>
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
                  width: 140,
                  height: 1,
                  fontWeight: "fontWeight",
                  borderRadius: "5px 0 0 5px",
                }}
              >
                매장명
              </Typography>
              <Typography sx={{ paddingLeft: 3 }}>
                {}
                {storeName}
              </Typography>
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
                  width: 140,
                  height: 1,
                  fontWeight: "fontWeight",
                  borderRadius: "5px 0 0 5px",
                }}
              >
                매장이메일
              </Typography>
              <Typography sx={{ paddingLeft: 3 }}>
                {}
                {storeEmail}
              </Typography>
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
                  width: 140,
                  height: 1,
                  fontWeight: "fontWeight",
                  borderRadius: "5px 0 0 5px",
                }}
              >
                CMS ID
              </Typography>
              <Typography sx={{ paddingLeft: 3, fontSize: "0.9rem" }}>
                {} {CMSId}
              </Typography>
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
                  width: 140,
                  height: 1,
                  fontWeight: "fontWeight",
                  borderRadius: "5px 0 0 5px",
                }}
              >
                패스워드
              </Typography>
              <Typography sx={{ paddingLeft: 3, fontSize: "0.9rem" }}>
                {} {password}
              </Typography>
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
            onClick={() => {
              setDialogOpen(false);
              redirectToUserSite();
            }}
          >
            해당 ID CMS 바로가기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
