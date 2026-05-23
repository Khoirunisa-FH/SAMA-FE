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

  // 1. Cek apakah pengguna sudah memiliki token login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // 2. Cek apakah rute meminta hak akses role tertentu
  if (allowedRoles) {
    // Bersihkan string role pengguna (jadikan lowercase dan hapus spasi di ujung)
    const userRoleCleaned = role?.toLowerCase().trim();

    // Periksa apakah role pengguna ada di dalam daftar allowedRoles
    const hasAccess = allowedRoles.some(
      (allowed) => allowed.toLowerCase().trim() === userRoleCleaned
    );

    // Jika role tidak sesuai, buang kembali ke login (memutus infinite loop)
    if (!hasAccess) {
      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }
  }

  // Jika lolos semua pemeriksaan keamanan, tampilkan halaman yang dituju
  return <Outlet />;
};

export default ProtectedRoute;