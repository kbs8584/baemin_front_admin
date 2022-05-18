import { useState } from "react";
import { useNavigate } from "react-router";
import { Typography, Container } from "@mui/material";
import { HOME_ROUTE_BUTTONS } from "constant";
// import { RouteButtonContainer } from "components/button/RouteButtonContainer";
// import {
//   RouteModeButton,
//   RouteOtherButton,
//   RouteCustomizedModeButton,
// } from "components/button/RouteButtons";
// import { RobotSyncModal } from "components/popup/Modal";

export default function Home() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Container sx={{ pb: 6 }}>
      HI@
      {/* <RobotSyncModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      <Typography variant="h1" color="common.black" mt={8}>
        S로봇 관리자 페이지
      </Typography>

      <Typography variant="subtitle1" color="common.black" mt={1} mb={8}>
        꾸미고 싶은 모드를 클릭해주세요.
      </Typography>

      <RouteButtonContainer>
        {HOME_ROUTE_BUTTONS.map((button, i) => {
          if (i < 4) {
            return (
              <RouteModeButton key={button.name} to={button.path}>
                {button.name}
              </RouteModeButton>
            );
          } else if (i === 4) {
            return (
              <RouteOtherButton
                key={button.name}
                // to={button.path}
                md="3"
                variant="outlined"
                onClick={() => navigate(button.path)}
              >
                {button.name}
              </RouteOtherButton>
            );
          }
        })}
        <RouteOtherButton
          variant="contained"
          md="9"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          로봇 동기화
        </RouteOtherButton>
      </RouteButtonContainer> */}
    </Container>
  );
}
