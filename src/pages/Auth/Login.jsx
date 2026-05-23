import { useState } from 'react';

import {
  Eye,
  EyeOff,
  LockKeyhole,
  User2,
  ShieldCheck,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import useAuthStore from '../../store/useAuthStore';

import LoginIllustration from '../../assets/login.svg';

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

  const [isLoading, setIsLoading] =
    useState(false);

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
      const response = await axios.post(
        'http://103.179.219.48:8765/login',
        {
          username: formData.username,
          password: formData.password,
        }
      );

      const token =
        response.data.token ||
        response.data.data?.token;

      const role =
        response.data.role ||
        response.data.data?.role ||
        'operator';

      const name =
        response.data.nama ||
        response.data.data?.nama ||
        'User';

      if (token) {
        localStorage.setItem(
          'token',
          token
        );

        localStorage.setItem(
          'role',
          role
        );

        setAuth(
          {
            name,
            username:
              formData.username,
          },
          token,
          role
        );

        navigate('/dashboard');
      } else {
        setError(
          'Token tidak ditemukan.'
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          'Username atau password salah.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-slate-50
        to-slate-200
        flex
        items-center
        justify-center
        p-6
      "
    >
      {/* MAIN CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative
          w-full
          max-w-7xl
          min-h-[720px]
          rounded-[42px]
          overflow-hidden
          shadow-2xl
          border border-white/50
          bg-white
          grid
          grid-cols-1
          lg:grid-cols-[58%_42%]
        "
      >
        {/* LEFT SIDE */}
        <div className="relative overflow-hidden">
          {/* BG IMAGE */}
          <img
            src={LoginIllustration}
            alt="Login Illustration"
            className="
              absolute inset-0
              w-full h-full
              object-cover
            "
          />

          {/* OVERLAY */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              from-[#071739]/95
              via-[#0B2B70]/88
              to-[#0EA5A4]/75
            "
          />

          {/* GLOW */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />

          {/* CONTENT */}
          <div
            className="
              relative z-10
              flex flex-col
              justify-between
              h-full
              p-12
            "
          >
            <div>
              {/* LOGO */}
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-16 h-16
                    rounded-3xl
                    bg-white/10
                    backdrop-blur-md
                    border border-white/10
                    flex items-center justify-center
                  "
                >
                  <ShieldCheck className="text-white" />
                </div>

                <div>
                  <h1
                    className="
                      text-4xl
                      font-bold
                      text-white
                    "
                  >
                    SAMA-BANTEN
                  </h1>

                  <p
                    className="
                      text-cyan-100
                      mt-1
                    "
                  >
                    Sistem Alih Media Arsip
                  </p>
                </div>
              </div>

              {/* BADGE */}
              <div
                className="
                  mt-16
                  inline-flex
                  items-center
                  gap-2
                  bg-white/10
                  backdrop-blur-md
                  border border-white/10
                  px-5 py-2.5
                  rounded-full
                  text-sm
                  text-white
                "
              >
                Enterprise Digital Archive
              </div>

              {/* TEXT */}
              <div className="mt-8 max-w-2xl">
                <h2
                  className="
                    text-6xl
                    font-bold
                    leading-tight
                    text-white
                  "
                >
                  Modernisasi
                  <br />
                  Pengelolaan Arsip
                  <br />
                  Digital
                </h2>

                <p
                  className="
                    mt-7
                    text-lg
                    leading-relaxed
                    text-cyan-100
                    max-w-xl
                  "
                >
                  Platform digital untuk proses
                  registrasi, digitalisasi,
                  indexing, quality control,
                  dan repository arsip pemerintah
                  secara modern dan terintegrasi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex
            items-center
            justify-center
            p-8
            lg:p-14
            bg-white
            relative
          "
        >
          {/* GLOW */}
          <div
            className="
              absolute
              top-[-100px]
              right-[-100px]
              w-72 h-72
              bg-cyan-200/30
              rounded-full
              blur-3xl
            "
          />

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              relative z-10
              w-full
              max-w-md
            "
          >
            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-cyan-50
                border border-cyan-100
                px-4 py-2
                text-sm
                font-medium
                text-cyan-700
              "
            >
              <ShieldCheck size={16} />
              BANTEN PROVINCE SYSTEM
            </div>

            {/* TITLE */}
            <div className="mt-8">
              <h1
                className="
                  text-4xl
                  font-bold
                  text-slate-800
                "
              >
                Welcome Back
              </h1>

              <p
                className="
                  mt-3
                  text-slate-500
                  leading-relaxed
                "
              >
                Silakan login menggunakan akun
                yang telah terdaftar untuk
                mengakses sistem alih media
                arsip digital.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div
                className="
                  mt-6
                  rounded-2xl
                  border border-red-200
                  bg-red-50
                  px-4 py-3
                  text-sm
                  text-red-600
                "
              >
                {error}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              className="mt-10 space-y-6"
            >
              {/* USERNAME */}
              <div>
                <label
                  className="
                    block mb-2
                    text-sm
                    font-semibold
                    text-slate-700
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
                    required
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50
                      pl-12 pr-4
                      text-slate-800
                      outline-none
                      transition-all duration-300
                      focus:border-cyan-500
                      focus:ring-0
                    "
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  className="
                    block mb-2
                    text-sm
                    font-semibold
                    text-slate-700
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
                    required
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50
                      pl-12 pr-12
                      text-slate-800
                      outline-none
                      transition-all duration-300
                      focus:border-cyan-500
                      focus:ring-0
                    "
                  />

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
                      hover:text-slate-700
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

              {/* REMEMBER */}
              <div
                className="
                  flex items-center
                  justify-between
                  text-sm
                "
              >
                <label
                  className="
                    flex items-center gap-2
                    text-slate-600
                  "
                >
                  <input
                    type="checkbox"
                    className="accent-cyan-500"
                  />

                  Remember me
                </label>
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                disabled={isLoading}
                className={`
                  w-full
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-teal-500
                  to-cyan-500
                  text-white
                  font-semibold
                  text-lg
                  shadow-lg
                  shadow-cyan-500/20
                  transition-all duration-300

                  ${
                    isLoading
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:opacity-95'
                  }
                `}
              >
                {isLoading
                  ? 'Menghubungkan...'
                  : 'Masuk ke Sistem'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}