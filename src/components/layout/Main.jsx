import { Box, Container, Grid } from "@mui/material";

export default function Main({ children }) {
  return (
    <Container sx={{ marginBottom: 18 }}>
      <Box pl={1} pr={1}>
        {children}
      </Box>
    </Container>
  );
}
