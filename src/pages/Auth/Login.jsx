import { useState } from 'react';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  LockKeyhole,
  User2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';

export default function Login() {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      username: '',
      password: '',
    });

  const [error, setError] =
    useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Hit endpoint login ke backend SAMA-BANTEN
      const response = await axios.post('http://103.179.219.48:8765/login', {
        username: formData.username,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Ekstraksi data token, role, dan nama dari response backend
      const token = response.data.token || response.data.data?.token;
      const userRole = response.data.role || response.data.data?.role;
      const userName = response.data.nama || response.data.data?.nama || 'User SAMA';

      if (token) {
        const finalRole = userRole || 'operator';

        // 1. Amankan data ke localStorage dengan key yang sinkron dengan useAuthStore
        localStorage.setItem('token', token);
        localStorage.setItem('role', finalRole);

        // 2. Perbarui State Global Zustand agar Router Guard/Dashboard ter-load sempurna
        setAuth(
          { name: userName, username: formData.username }, // Data user object
          token,                                           // JWT token string
          finalRole                                        // User role string
        );

        // 3. Alihkan halaman langsung ke Dashboard yang sekarang sudah terotorisasi
        navigate('/dashboard');
      } else {
        setError('Login berhasil, namun token tidak ditemukan dari respon server.');
      }

    } catch (err) {
      console.error("Error Login:", err);
      const serverMessage = err.response?.data?.message || err.response?.data?.error;
      setError(serverMessage || 'Username atau password salah atau server bermasalah.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#071739]
        flex items-center justify-center
        px-4
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-[-120px]
          left-[-120px]
          w-[380px]
          h-[380px]
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[-140px]
          right-[-100px]
          w-[340px]
          h-[340px]
          rounded-full
          bg-teal-400/10
          blur-3xl
        "
      />

      {/* Grid Pattern */}
      <div
        className="
          absolute inset-0
          opacity-[0.03]
        "
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative z-10
          w-full max-w-md
          rounded-[36px]
          border border-white/10
          bg-white/10
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(0,0,0,0.45)]
          p-8 lg:p-10
        "
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
              w-24 h-24
              rounded-[28px]
              bg-gradient-to-br
              from-teal-400
              to-cyan-500
              flex items-center justify-center
              mx-auto
              shadow-2xl
              shadow-teal-500/30
            "
          >
            <ShieldCheck
              size={42}
              className="text-white"
            />
          </motion.div>

          <h1
            className="
              mt-7
              text-4xl
              font-bold
              tracking-wide
              text-white
            "
          >
            SAMA-BANTEN
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-relaxed
              text-slate-300
            "
          >
            Sistem Alih Media Arsip Banten
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mb-6
              rounded-2xl
              border border-red-400/20
              bg-red-500/10
              px-4 py-3
              text-sm
              text-red-200
            "
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Username */}
          <div>
            <label
              className="
                mb-2 block
                text-sm
                font-medium
                text-slate-200
              "
            >
              Username
            </label>

            <div className="relative">
              <User2
                size={18}
                className="
                  absolute
                  left-4 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                className="
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-white/90
                  py-4 pl-12 pr-4
                  text-slate-800
                  placeholder:text-slate-400
                  outline-none
                  transition-all duration-300
                  focus:border-teal-400
                  focus:ring-4
                  focus:ring-teal-500/20
                "
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="
                mb-2 block
                text-sm
                font-medium
                text-slate-200
              "
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="
                  absolute
                  left-4 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-white/90
                  py-4 pl-12 pr-12
                  text-slate-800
                  placeholder:text-slate-400
                  outline-none
                  transition-all duration-300
                  focus:border-teal-400
                  focus:ring-4
                  focus:ring-teal-500/20
                "
                disabled={isLoading}
                required
              />

              {/* Toggle Password */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-4 top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-slate-600
                  transition-all duration-300
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div
            className="
              flex items-center
              text-sm
              text-slate-300
            "
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-teal-500"
              />
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{
              scale: 0.98,
            }}
            whileHover={{
              scale: 1.01,
            }}
            type="submit"
            disabled={isLoading}
            className={`
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-teal-500
              to-cyan-500
              py-4
              font-semibold
              text-white
              shadow-xl
              shadow-teal-500/30
              transition-all duration-300
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-95'}
            `}
          >
            {isLoading ? 'Menghubungkan...' : 'Masuk ke Sistem'}
          </motion.button>
        </form>

        {/* Footer */}
        <div
          className="
            mt-8
            border-t border-white/10
            pt-5
            text-center
          "
        >
          <p
            className="
              text-xs
              text-slate-400
              leading-relaxed
            "
          >
            © 2026 SAMA-BANTEN
            <br />
            Digital Archive Management System
          </p>
        </div>
      </motion.div>
    </div>
  );
}