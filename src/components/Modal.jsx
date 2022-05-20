import {
  Dialog,
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  InputBase,
  Input,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Filter, PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Profile from "assets/main_logo.png";

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
                borderRadius: "5px",
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
                  borderRadius: "5px 0 0 5px",
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
                borderRadius: "5px",
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
                  borderRadius: "5px 0 0 5px",
                }}
              >
                매장이메일
              </Typography>
              <Typography item sx={{ paddingLeft: 3 }}>
                {}baemin@baemin.com
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
export const CreateStaffAccount = ({
  dialogOpen,
  setDialogOpen,
  staffInfo,
}) => {
  const Input = styled("input")({
    display: "none",
  });
  const infoLabel = [
    { name: "name", title: "이름", placeholder: "이름을 입력하세요" },
    { name: "id", title: "아이디", placeholder: "아이디를 입력하세요" },
    { name: "position", title: "직책", placeholder: "직책을 입력하세요" },
    {
      name: "password",
      title: "비밀번호",
      placeholder: "비밀번호를 입력하세요",
    },
  ];
  // console.log(staffInfo && Object.keys(staffInfo));
  // console.log(staffInfo);
  return (
    <Modal fullWidth dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
      <Grid container sx={{ padding: 3, justifyContent: "center" }}>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item component="h1" mb={3} sx={{ fontSize: "1.3rem" }}>
            {staffInfo ? "직원 정보 수정" : "신규 직원 등록"}
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
        <Box mb={4}>
          <Avatar
            sx={{
              position: "absolute",
              transform: "translate(-5px,-5px)",
              width: "110px",
              height: "110px",
              backgroundColor: "common.white",
              boxShadow: "0px 2px 5px 1px #eee",
            }}
          ></Avatar>
          {staffInfo ? (
            <Avatar
              alt="staffInfo.name"
              src={Profile}
              sx={{
                width: "100px",
                height: "100px",
                backgroundColor: "grey.200",
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
                backgroundColor: "grey.200",
              }}
            >
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton aria-label="upload picture" component="span">
                  <PhotoCamera sx={{ width: "2.1em", height: "2.1em" }} />
                </IconButton>
              </label>
            </Avatar>
          )}
        </Box>
        <Box
          mb={4}
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
          }}
        >
          {infoLabel.map((label) => (
            <Grid
              key={label.title}
              container
              mb={0.1}
              sx={{
                height: "78px",
                border: "2px solid",
                borderColor: "primary.light",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "85px",
                  height: 1,
                  padding: 1,
                  color: "common.white",
                  backgroundColor: "primary.light",
                }}
              >
                {label.title}
              </Grid>
              {staffInfo ? (
                <Typography
                  sx={{ display: "flex", alignItems: "center", paddingLeft: 1 }}
                ></Typography>
              ) : (
                <InputBase
                  placeholder={label.placeholder}
                  sx={{ width: "180px", paddingLeft: 1 }}
                />
              )}
            </Grid>
          ))}
        </Box>
        {staffInfo && (
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: 45,
              padding: 4,
              marginTop: 1,
              fontSize: "bigButton.fontSize",
              fontWeight: "fontWeight",
              backgroundColor: "primary.alert",
            }}
            onClick={() => setDialogOpen(false)}
          >
            직원 삭제
          </Button>
        )}

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
          {staffInfo ? "수정" : "새 직원 등록"}
        </Button>
      </Grid>
    </Modal>
  );
};
