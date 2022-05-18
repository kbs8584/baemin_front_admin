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
} from "@mui/material";
import { useState } from "react";
import { ShowCreatedId } from "components/Modal";
import Profile from "assets/main_logo.png";

export default function CreateId() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const staffArray = [
    {
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
    {
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
    {
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
    {
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
    {
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
    {
      name: "슈퍼 관리자",
      position: "슈퍼관리자",
      profileImage: "",
      activated: "활성화",
    },
  ];
  return (
    <Container sx={{ marginBottom: 18 }}>
      <Grid mt={6} mb={5} container sx={{ justifyContent: "space-between" }}>
        <Typography item variant="h1" sx={{ fontSize: "subtitle1.fontSize" }}>
          직원 관리
        </Typography>
        <Button
          variant="contained"
          sx={{ height: 42, padding: 3, fontWeight: "fontWeight" }}
        >
          직원 추가
        </Button>
      </Grid>
      <Grid container>
        {staffArray.map((staff) => (
          <Grid
            item
            direction="column"
            xs={3}
            ms={3}
            p={4}
            sx={{
              display: "flex",
              border: "3px solid",
              borderRadius: 3,
              borderColor: "grey.200",
              alignItems: "center",
            }}
          >
            <CardMedia
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
            />
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
            <CardActions s>
              <Button>수정하기</Button>
              <ToggleButton>{staff.activated}</ToggleButton>
            </CardActions>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
