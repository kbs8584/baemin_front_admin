import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  InputBase,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  ToggleButton,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { ShowCreatedId } from "components/Modal";
import Profile from "assets/main_logo.png";
import { CreateStaffAccount } from "components/Modal";

export default function CreateId() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [staffInfo, setStaffInfo] = useState();
  const staffArray = [
    {
      id: 1,
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
    {
      id: 2,
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
    {
      id: 3,
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
    {
      id: 4,
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
    {
      id: 5,
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
    {
      id: 6,
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
  ];
  return (
    <Container sx={{ marginBottom: 18 }}>
      <CreateStaffAccount
        staffInfo={staffInfo}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
      <Grid mt={6} mb={5} container sx={{ justifyContent: "space-between" }}>
        <Grid item component="h1" sx={{ fontSize: "subtitle1.fontSize" }}>
          직원 관리
        </Grid>
        <Button
          variant="contained"
          sx={{ height: 42, padding: 3, fontWeight: "fontWeight" }}
          onClick={() => {
            setDialogOpen(true);
            setStaffInfo();
          }}
        >
          직원 추가
        </Button>
      </Grid>
      <Grid
        container
        columnGap={3}
        rowGap={3}
        sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
      >
        {staffArray.map((staff) => (
          <Grid
            key={staff.id}
            item
            p={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "3px solid",
              borderRadius: 3,
              borderColor: "grey.200",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={staffArray.name}
              src={Profile}
              sx={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
            {/* <CardMedia
              component="img"
              image={Profile}
              alt={staffArray.name}
              sx={{
                width: "100px",
                height: "100px",
                borderRadius: 200,
                boxShadow: "0px 4px 2px 2px #ddd",
                objectFit: "contain",
              }}
            /> */}
            <CardContent>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: "fontWeight",
                  textAlign: "center",
                }}
              >
                {staff.name}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", textAlign: "center" }}>
                {staff.position}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setDialogOpen(true);
                  setStaffInfo(staff);
                }}
              >
                수정하기
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginLeft: "0 !important", marginTop: 1 }}
              >
                {staff.activated}
              </Button>
            </CardActions>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
