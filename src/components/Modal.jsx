import {
  Dialog,
  Container,
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const Modal = ({ dialogOpen, setDialogOpen, children, ...rest }) => (
  <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} {...rest}>
    {children}
  </Dialog>
);
export const ShowCreatedId = ({ dialogOpen, setDialogOpen }) => {
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
                }}
              >
                매장 ID
              </Typography>
              <Typography sx={{ paddingLeft: 3, fontSize: "0.9rem" }}>
                {} baemin1
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
              }}
            >
              <Typography
                item
                bgcolor="grey.100"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 140,
                  height: 1,
                  fontWeight: "fontWeight",
                }}
              >
                매장명
              </Typography>
              <Typography item sx={{ paddingLeft: 3 }}>
                {}배민 매장 성남점(baeminsm)
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
                }}
              >
                CMS ID
              </Typography>
              <Typography sx={{ paddingLeft: 3, fontSize: "0.9rem" }}>
                {} cmsbaemin
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
                }}
              >
                패스워드
              </Typography>
              <Typography sx={{ paddingLeft: 3, fontSize: "0.9rem" }}>
                {}0000
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
            onClick={() => setDialogOpen(false)}
          >
            해당 ID CMS 바로가기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
