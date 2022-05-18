import { useState } from "react";
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
import TempAvatar from "assets/temp_avatar.jpeg";
import MainLogo from "assets/main_logo.png";
import { setCurrentCustomize } from "store/app";

export default function Header() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  //   const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      <Box p={3}>
        <CardMedia
          component="img"
          src={MainLogo}
          onClick={() => navigate("/")}
          sx={{
            maxWidth: "172px",

            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </Box>

      <RouteButtonContainer>
        <Grid item>
          {HOME_ROUTE_BUTTONS.map((button) => (
            <RouteButton key={button.name} to={button.path}>
              {button.name}
            </RouteButton>
          ))}
        </Grid>
        <Grid item xs={5}>
          <Button variant="outlined" onClick={() => navigate("sign-in")}>
            로그인
          </Button>
        </Grid>
        {/* <Grid item xs={5}>
          <Grid container justifyContent="end" alignItems="center" spacing={2}>
            {Boolean(user) && (
              <>
                <Grid item>
                  <Avatar src={TempAvatar} />
                </Grid>
                <Grid item>
                  <Typography>
                    <Typography component="span" fontWeight={900}>
                      배민분식 성남점{" "}
                    </Typography>
                    사장님
                  </Typography>
                </Grid>
              </>
            )}

            <Grid item>
              {Boolean(user) ? (
                // Todo: user restore
                <Button variant="outlined" sx={{ borderRadius: 2 }}>
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

            <Grid item>
              {Boolean(user) && (
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  로봇 동기화
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid> */}
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
  //   const currentMode = useSelector((state) => state.app.currentCustomize.mode);

  //   need update
  const currentMode = "Hi";
  //

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeMode = () => {
    if (to === "promote") {
      dispatch(setCurrentCustomize({ key: "scene", value: to }));
    }

    dispatch(setCurrentCustomize({ key: "mode", value: to }));
    navigate(to);
  };

  return (
    <Button
      sx={{
        color:
          currentMode === to ? "#000000" : (theme) => theme.palette.grey[400],
        fontWeight: 900,
      }}
      onClick={handleChangeMode}
    >
      {children}
    </Button>
  );
};
