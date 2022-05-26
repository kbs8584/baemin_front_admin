import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "components/layout/index";

import SignIn from "page/auth/SignIn";
import Gallery from "./page/gallery";
import ManageStore from "./page/manageStore";
import CreateId from "./page/createId";

import { setUser } from "store/auth";
import { checkUser } from "api/auth";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

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
  const dispatch = useDispatch();

  const handleCheckUser = async () => {
    const res = await checkUser();
    // console.log(res);
    if (res) {
      dispatch(setUser(true));
    } else {
      dispatch(setUser(false));
    }
  };
  useEffect(() => {
    handleCheckUser();
  }, []);

  if (!user) {
    // redirect with memo current path
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export function CheckUser() {
  const handleCheckUser = async () => {
    const res = await checkUser();
    console.log(res);
  };
  useEffect(() => {
    handleCheckUser();
  }, []);
}
