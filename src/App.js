import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "components/layout/index";

import Home from "page/home/index";
import SignIn from "page/auth/SignIn";
import Gallery from "./page/gallery";
import ManageStore from "./page/manageStore";
import ManageStaff from "./page/manageStaff";
import CreateId from "./page/createId";

export default function App() {
  return (
    <Routes>
      <Route element={<RequiredAuth redirectPath="/sign-in" />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<ManageStore />} />
          <Route path="create-id" element={<CreateId />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
      </Route>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="*" element={<SignIn />} />
    </Routes>
  );
}

const RequiredAuth = ({ redirectPath, children }) => {
  const user = useSelector((state) => state.auth.user);
  let location = useLocation();

  if (!user) {
    // redirect with memo current path
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};
