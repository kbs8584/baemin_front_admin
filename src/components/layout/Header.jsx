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
import { getUsersInfo, signOut } from "api/auth";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // logout
  const handleSubmit = async (e) => {
    sessionStorage.removeItem("TOKEN");
    dispatch(setUser(null));
    const res = await signOut();
  };

  return (
    <Container>
      <Grid container p={3} pl={1}>
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
                      관리자
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLocation = window.location.pathname;
  const currentPath = () => {
    let path = currentLocation;
    if (currentLocation === "/") return path;
    path = currentLocation.substring(1);
    return path;
  };

  const handleChangeMode = () => {
    dispatch(setCurrentMenu(to));

    navigate(to, { replace: true });
  };

  return (
    <Button
      sx={{
        color:
          to === currentPath() ? "#000000" : (theme) => theme.palette.grey[400],
        fontWeight: to === currentPath() ? "900" : "inherit",
      }}
      onClick={handleChangeMode}
    >
      {children}
    </Button>
  );
};
