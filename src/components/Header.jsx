import { Bell, Menu, Search } from 'lucide-react';

import { motion } from 'framer-motion';

export default function Header({
  setMobileOpen,
}) {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        sticky top-0 z-30
        bg-white/90 backdrop-blur-xl
        border-b border-slate-200
        px-4 lg:px-8
        py-4
      "
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3 w-full max-w-xl">
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="
              lg:hidden
              p-2 rounded-xl
              hover:bg-slate-100
              transition
            "
          >
            <Menu size={22} />
          </button>

          {/* Search */}
          <div
            className="
              flex items-center gap-2
              bg-slate-100
              px-4 py-3
              rounded-2xl
              w-full
            "
          >
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Cari dokumen, arsip, metadata..."
              className="
                bg-transparent
                outline-none
                w-full
                text-sm
                text-slate-700
              "
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button
            className="
              relative
              p-2 rounded-xl
              hover:bg-slate-100
              transition
            "
          >
            <Bell size={20} />

            <span
              className="
                absolute top-1 right-1
                w-2 h-2 rounded-full
                bg-red-500
              "
            />
          </button>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="
              flex items-center gap-3
              bg-slate-100
              px-3 py-2
              rounded-2xl
              cursor-pointer
            "
          >
            <div className="hidden sm:block text-right">
              <h4 className="text-sm font-semibold text-slate-800">
                Admin SAMA
              </h4>

              <p className="text-xs text-slate-500">
                Super Admin
              </p>
            </div>

            <div
              className="
                w-11 h-11
                rounded-full
                bg-teal-500
                text-white
                flex items-center justify-center
                font-bold
              "
            >
              AS
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}