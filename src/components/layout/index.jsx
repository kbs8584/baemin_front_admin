import { Outlet, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";

import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

export default function Layout() {
  const isSignInPage = useLocation().pathname === "/sign-in";

  return (
    <>
      {!isSignInPage && <Header />}

      <Divider />

      <Outlet />

      <Divider />

      {!isSignInPage && <Footer />}
    </>
  );
}
