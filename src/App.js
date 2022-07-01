import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from 'components/layout/index';

import SignIn from 'page/auth/SignIn';
import Gallery from 'page/gallery';
import ManageStore from 'page/manageStore';
import CreateId from 'page/createId';
import MiddleAdmin from 'page/MiddleAdmin';
import MiddleAdminAccount from 'page/MiddleAdminAccount';

import { validateProfile } from 'store/auth';
import { useEffect } from 'react';

const TOKEN = 'TOKEN';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) return;

    dispatch(validateProfile(token));
  }, []);

  return (
    <Routes>
      <Route element={<RequiredAuth redirectPath="/sign-in" />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<ManageStore />} />
          <Route path="create-id" element={<CreateId />} />
          <Route path="gallery" element={<Gallery />} />

          <Route path="middle-admin">
            <Route index element={<MiddleAdmin />} />
            <Route path="create-id" element={<MiddleAdminAccount />} />
          </Route>
        </Route>
      </Route>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="*" element={<SignIn />} />
    </Routes>
  );
}

const RequiredAuth = ({ redirectPath, children }) => {
  const user = useSelector(state => state.auth.user);
  let location = useLocation();

  if (!user)
    return <Navigate to={redirectPath} state={{ from: location }} replace />;

  return children ? children : <Outlet />;
};
