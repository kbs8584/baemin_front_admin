import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";

import { HOME_ROUTE_BUTTONS } from "constant";
import MainLogo from "assets/main_logo.png";
import { setCurrentMenu } from "store/app";
import { setUser } from "store/auth";
import { getUserInfo, signOut } from "api/auth";

// (e) => {
//   dispatch(setUser(false));
//   handleSubmit(e);

// }

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("access_token");
    const res = await signOut();
    // console.log(res);
  };

  // useEffect(() => {
  //   const res = getUserInfo().then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <Container>
      <Grid container p={3}>
        <CardMedia
          component="img"
          src={MainLogo}
          onClick={() => {
            navigate("/");
            dispatch(setCurrentMenu("/"));
          }}
          sx={{
            maxWidth: "172px",
            objectFit: "contain",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
        <Typography
          ml={2}
          sx={{
            fontSize: "subtitle1.fontSize",
            fontWeight: "h1.fontWeight",
          }}
        >
          어드민
        </Typography>
      </Grid>
      <RouteButtonContainer>
        <Grid item>
          {HOME_ROUTE_BUTTONS.map((button) => (
            <RouteButton key={button.name} to={button.path}>
              {button.name}
            </RouteButton>
          ))}
        </Grid>
        <Grid item xs={5}>
          <Grid container justifyContent="end" alignItems="center" spacing={2}>
            {Boolean(user) && (
              <>
                <Grid item>
                  <Avatar
                  // src={TempAvatar}
                  />
                </Grid>
                <Grid item>
                  <Typography>
                    <Typography component="span" fontWeight={900}>
                      배민 관리자
                    </Typography>{" "}
                    님
                  </Typography>
                </Grid>
              </>
            )}
            <Grid item>
              {Boolean(user) ? (
                // Todo: user restore
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                  onClick={handleSubmit}
                >
                  로그아웃
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => navigate("sign-in")}
                  sx={{ borderRadius: 2 }}
                >
                  로그인
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </RouteButtonContainer>
    </Container>
  );
}

const RouteButtonContainer = ({ children }) => (
  <Grid container justifyContent="space-between" pb={1}>
    {children}
  </Grid>
);

const RouteButton = ({ children, to }) => {
  const currentMenu = useSelector((state) => state.app.currentMenu);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeMode = () => {
    dispatch(setCurrentMenu(to));
    navigate(to);
  };
  return (
    <Button
      sx={{
        color:
          currentMenu === to ? "#000000" : (theme) => theme.palette.grey[400],
        fontWeight: 900,
      }}
      onClick={handleChangeMode}
    >
      {children}
    </Button>
  );
};