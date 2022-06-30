import { Outlet, useLocation } from 'react-router-dom';

import { Container, Divider, Box } from '@mui/material';

import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';

export default function Layout() {
  const isSignInPage = useLocation().pathname === '/sign-in';

  return (
    <>
      {!isSignInPage && <Header />}

      <Container sx={{ mb: 18 }}>
        <Box px={1}>
          <Outlet />
        </Box>
      </Container>

      <Divider />

      {!isSignInPage && <Footer />}
    </>
  );
}
