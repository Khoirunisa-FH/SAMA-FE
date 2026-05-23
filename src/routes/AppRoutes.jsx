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
import Registrasi from '../pages/Media/Registrasi';
import Instansi from '../pages/Master/Instansi';


export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES (Tanpa proteksi & layout utama) */}
      <Route path="/login" element={<Login />} />

      {/* 2. PROTECTED ROUTES DENGAN MAIN LAYOUT */}
      {/* Semua rute di dalam blok ini otomatis dibungkus MainLayout & dicek otentikasinya */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>

          {/* Dashboard: Bisa diakses oleh semua role yang sudah login */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* RUTE KHUSUS: SUPERADMIN & OPERATOR */}
          {/* Membungkus modul alih media yang membutuhkan hak akses spesifik */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={['superadmin', 'super admin', 'operator']}
              />
            }
          >
            <Route
              path="/alih-media/registrasi-box"
              element={<Registrasi />}
            />
            <Route
              path="/alih-media/upload"
              element={<MediaUpload />}
            />
            <Route
              path="/master/instansi"
              element={<Instansi />}
            />
            <Route
              path="/master/manajemen-file"
              element={<MediaUpload />}
            />
            <Route
              path="/arsip/aktif"
              element={<MediaUpload />}
            />
            <Route
              path="/arsip/inaktif"
              element={<MediaUpload />}
            />
            <Route
              path="/arsip/klasifikasi"
              element={<MediaUpload />}
            />
            <Route
              path="/arsip/layanan"
              element={<MediaUpload />}
            />
            <Route
              path="/otorisasi/verifikasi"
              element={<MediaUpload />}
            />
            <Route
              path="/otorisasi/watermarking"
              element={<MediaUpload />}
            />
            <Route
              path="/penyusutan/jra"
              element={<MediaUpload />}
            />
            <Route
              path="/penyusutan/dum"
              element={<MediaUpload />}
            />
            <Route
              path="/penyusutan/pemusnahan"
              element={<MediaUpload />}
            />
            <Route
              path="/penyusutan/statis"
              element={<MediaUpload />}
            />
            <Route
              path="/laporan/rekap"
              element={<MediaUpload />}
            />
            <Route
              path="/laporan/audit"
              element={<MediaUpload />}
            />
            <Route
              path="/laporan/search"
              element={<MediaUpload />}
            />
            <Route
              path="/pengaturan/user"
              element={<MediaUpload />}
            />
            <Route
              path="/pengaturan/metadata"
              element={<MediaUpload />}
            />
            <Route
              path="/pengaturan/maintenance"
              element={<MediaUpload />}
            />
          </Route>

          {/* Kamu bisa tambah modul terproteksi role lain di sini nanti, contoh: */}
          {/* <Route element={<ProtectedRoute allowedRoles={['pimpinan', 'superadmin']} />}>
            <Route path="/validasi/qc" element={<QCPage />} />
          </Route> 
          */}

        </Route>
      </Route>

      {/* 3. DEFAULT & FALLBACK REDIRECTS */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}