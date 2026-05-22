import {
  Navigate,
  Outlet,
} from 'react-router-dom';

import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = ({
  allowedRoles,
}) => {
  const { token, role } =
    useAuthStore();

  // Belum login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Role tidak sesuai
  if (
    allowedRoles &&
    !allowedRoles.includes(
      role?.toLowerCase()
    )
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;