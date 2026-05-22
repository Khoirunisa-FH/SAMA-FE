import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import ProtectedRoute from './ProtectedRoute';

import Login from '../pages/Auth/Login';

import Dashboard from '../pages/Dashboard/Dashboard';

import MediaUpload from '../pages/Media/MediaUpload';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              'superadmin',
            ]}
          />
        }
      >
        {/* Layout */}
        <Route
          element={<MainLayout />}
        >
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Media */}
          <Route
            path="/alih-media/upload"
            element={<MediaUpload />}
          />
        </Route>
      </Route>

      {/* Default */}
      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
}