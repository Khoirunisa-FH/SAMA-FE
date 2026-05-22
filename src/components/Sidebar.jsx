import { useState } from 'react';

import {
  LayoutDashboard,
  FolderOpen,
  ShieldCheck,
  Archive,
  FileBarChart2,
  Settings,
  ChevronDown,
  Trash2,
  LogOut,
  Shield,
  Menu,
  X,
} from 'lucide-react';

import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import useAuthStore from '../store/useAuthStore';

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}) {
  const navigate = useNavigate();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const [openMenu, setOpenMenu] =
    useState('alih-media');

  const menus = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },

    {
      title: 'Alih Media',
      icon: FolderOpen,
      key: 'alih-media',

      children: [
        {
          title: 'Upload',
          path: '/alih-media/upload',
        },
        {
          title: 'Registrasi Box',
          path:
            '/alih-media/registrasi-box',
        },
        {
          title: 'Indexing',
          path: '/alih-media/indexing',
        },
        {
          title: 'Berita Acara',
          path:
            '/alih-media/berita-acara',
        },
        {
          title: 'Monitoring',
          path:
            '/alih-media/monitoring',
        },
      ],
    },

    {
      title: 'Quality Control',
      icon: ShieldCheck,
      path: '/quality-control',
    },

    {
      title: 'Arsip',
      icon: Archive,
      key: 'arsip',

      children: [
        {
          title: 'Arsip Aktif',
          path: '/arsip/aktif',
        },
        {
          title: 'Arsip Inaktif',
          path: '/arsip/inaktif',
        },
        {
          title: 'Klasifikasi',
          path: '/arsip/klasifikasi',
        },
        {
          title: 'Layanan Arsip',
          path: '/arsip/layanan',
        },
      ],
    },

    {
      title: 'Otorisasi',
      icon: Shield,
      key: 'otorisasi',

      children: [
        {
          title: 'Verifikasi Metadata',
          path:
            '/otorisasi/verifikasi',
        },
        {
          title: 'Watermarking',
          path:
            '/otorisasi/watermarking',
        },
      ],
    },

    {
      title: 'Penyusutan',
      icon: Trash2,
      key: 'penyusutan',

      children: [
        {
          title: 'JRA',
          path: '/penyusutan/jra',
        },
        {
          title: 'DUM',
          path: '/penyusutan/dum',
        },
        {
          title: 'Pemusnahan',
          path:
            '/penyusutan/pemusnahan',
        },
        {
          title: 'Arsip Statis',
          path:
            '/penyusutan/statis',
        },
      ],
    },

    {
      title: 'Laporan',
      icon: FileBarChart2,
      key: 'laporan',

      children: [
        {
          title: 'Rekap Laporan',
          path: '/laporan/rekap',
        },
        {
          title: 'Audit Trail',
          path: '/laporan/audit',
        },
        {
          title: 'Global Search',
          path: '/laporan/search',
        },
      ],
    },

    {
      title: 'Pengaturan',
      icon: Settings,
      key: 'pengaturan',

      children: [
        {
          title: 'User Management',
          path: '/pengaturan/user',
        },
        {
          title: 'Master Data',
          path:
            '/pengaturan/master-data',
        },
        {
          title: 'Custom Metadata',
          path:
            '/pengaturan/metadata',
        },
        {
          title: 'Maintenance',
          path:
            '/pengaturan/maintenance',
        },
      ],
    },
  ];

  const SidebarContent = () => (
    <div
      className="
        flex flex-col
        h-full
        bg-[#071739]
        text-white
      "
    >
      {/* Logo */}
      <div
        className="
          px-6 py-8
          border-b border-white/10
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-teal-400
          "
        >
          SAMA-BANTEN
        </h1>

        <p
          className="
            text-sm
            text-slate-300
            mt-2
            leading-relaxed
          "
        >
          Sistem Alih Media Arsip Banten
        </p>
      </div>

      {/* Menu */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-4 py-5
          space-y-2
        "
      >
        {menus.map((menu, index) => {
          const Icon = menu.icon;

          // Menu biasa
          if (!menu.children) {
            return (
              <NavLink
                key={index}
                to={menu.path}
                onClick={() =>
                  setMobileOpen(false)
                }
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  px-4 py-3
                  rounded-2xl
                  transition-all duration-300
                  font-medium

                  ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                      : 'text-slate-200 hover:bg-white/5'
                  }
                `
                }
              >
                <Icon size={20} />

                <span>{menu.title}</span>
              </NavLink>
            );
          }

          // Dropdown
          return (
            <div key={index}>
              <button
                onClick={() =>
                  setOpenMenu(
                    openMenu === menu.key
                      ? null
                      : menu.key
                  )
                }
                className="
                  w-full
                  flex items-center justify-between
                  px-4 py-3
                  rounded-2xl
                  text-slate-100
                  hover:bg-white/5
                  transition-all duration-300
                "
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />

                  <span className="font-medium">
                    {menu.title}
                  </span>
                </div>

                <ChevronDown
                  size={18}
                  className={`
                    transition-transform duration-300
                    ${
                      openMenu === menu.key
                        ? 'rotate-180'
                        : ''
                    }
                  `}
                />
              </button>

              <AnimatePresence>
                {openMenu === menu.key && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="
                      ml-5
                      mt-2
                      border-l border-white/10
                      pl-4
                      space-y-1
                      overflow-hidden
                    "
                  >
                    {menu.children.map(
                      (sub, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={sub.path}
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className={({
                            isActive,
                          }) =>
                            `
                            flex items-center gap-3
                            px-4 py-3
                            rounded-xl
                            text-sm
                            transition-all duration-300

                            ${
                              isActive
                                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20'
                                : 'text-slate-300 hover:bg-white/5 hover:text-white'
                            }
                          `
                          }
                        >
                          <div
                            className={`
                              w-2 h-2 rounded-full

                              ${
                                location.pathname ===
                                sub.path
                                  ? 'bg-cyan-400'
                                  : 'bg-slate-500'
                              }
                            `}
                          />

                          {sub.title}
                        </NavLink>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div
        className="
          p-4
          border-t border-white/10
        "
      >
        <button
          onClick={() => {
            logout();

            navigate('/login');
          }}
          className="
            w-full
            rounded-2xl
            border border-white/10
            bg-white/5
            hover:bg-red-500/10
            hover:border-red-500/20
            py-3.5
            flex items-center justify-center gap-3
            text-slate-200
            hover:text-red-300
            transition-all duration-300
          "
        >
          <LogOut size={18} />

          Keluar Sistem
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div
        className="
          xl:hidden
          fixed top-0 left-0 right-0
          z-40
          h-16
          bg-white
          border-b border-slate-200
          flex items-center justify-between
          px-4
        "
      >
        <button
          onClick={() =>
            setMobileOpen(true)
          }
          className="
            p-2 rounded-xl
            hover:bg-slate-100
          "
        >
          <Menu size={24} />
        </button>

        <h1
          className="
            text-lg
            font-bold
            text-[#071739]
          "
        >
          SAMA-BANTEN
        </h1>

        <div className="w-10" />
      </div>

      {/* DESKTOP */}
      <aside
        className="
          hidden xl:flex
          fixed left-0 top-0
          w-72
          h-screen
          z-40
          shadow-2xl
        "
      >
        <SidebarContent />
      </aside>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                fixed inset-0
                bg-black/50
                z-40
                xl:hidden
              "
            />

            {/* Sidebar */}
            <motion.div
              initial={{
                x: -320,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: -320,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                fixed top-0 left-0
                w-72
                h-screen
                z-50
                shadow-2xl
                xl:hidden
              "
            >
              {/* Close */}
              <button
                onClick={() =>
                  setMobileOpen(false)
                }
                className="
                  absolute top-4 right-4
                  z-50
                  p-2
                  rounded-xl
                  bg-white/10
                  hover:bg-white/20
                  text-white
                "
              >
                <X size={20} />
              </button>

              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}