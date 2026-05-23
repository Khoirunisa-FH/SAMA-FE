import axios from 'axios';

const axiosInstance = axios.create({
  // Mengambil alamat server dari env, jika tidak ada memakai fallback IP dev backend SAMA
  baseURL: import.meta.env.VITE_BASE_URL || 'http://103.179.219.48:8765',
  timeout: 30000, // Tambahkan timeout 30 detik jika sewaktu-waktu upload file berukuran besar
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    // Pastikan headers objek sudah terinisialisasi dengan aman
    config.headers = config.headers || {};

    // Validasi tambahan agar tidak mengirim string "null" atau "undefined" ke backend
    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Opsional: Kamu bisa menambahkan Response Interceptor di bawah jika ingin menangani 
// otomatis kick-out/logout jika token kedaluwarsa (Error 401 dari server)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Sesi habis atau Token tidak valid. Mengalihkan ke login...");
      // Membersihkan sisa storage jika token expired
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      // Kamu bisa memaksa window location pindah ke login jika diperlukan:
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;