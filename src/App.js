import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "components/layout/index";

import SignIn from "page/auth/SignIn";
import Gallery from "./page/gallery";
import ManageStore from "./page/manageStore";
import CreateId from "./page/createId";

import { checkUser, setUser } from "store/auth";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const storage = sessionStorage;

  // useEffect(() => {
  //   (async function () {
  //     const token = storage.getItem("TOKEN_AUTH");

  //     if (!token) return;

  //     await dispatch(validateProfile(token));
  //   })();
  // }, []);

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
  let location = useLocation();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // redirect with memo current path
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

// export function CheckUser() {
//   const handleCheckUser = async () => {
//     const res = await checkUser();
//     console.log(res);
//   };
//   useEffect(() => {
//     handleCheckUser();
//   }, []);
// }
