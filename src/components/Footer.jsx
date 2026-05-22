import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="
        border-t border-slate-200
        bg-white
        px-6 py-4
        mt-6
      "
    >
      <div
        className="
          flex flex-col md:flex-row
          items-center justify-between
          gap-2
          text-sm
        "
      >
        {/* Left */}
        <div>
          <h3 className="font-bold text-slate-800">
            SAMA-BANTEN
          </h3>

          <p className="text-slate-500 text-xs">
            Sistem Alih Media Arsip Banten
          </p>
        </div>

        {/* Right */}
        <div className="text-slate-400 text-xs">
          © 2026 Digital Archive Management System
        </div>
      </div>
    </motion.footer>
  );
}