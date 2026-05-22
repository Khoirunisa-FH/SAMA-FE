import { motion } from 'framer-motion';

import {
  FileText,
  FolderCheck,
  ShieldAlert,
  Database,
  Clock3,
  Activity,
  HardDrive,
  ScanSearch,
  Archive,
  TrendingUp,
} from 'lucide-react';

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/* ===============================
   DUMMY DATA
=============================== */

const stats = [
  {
    title: 'Total Arsip',
    value: '12.321',
    desc: 'Seluruh dokumen digital',
    icon: FileText,
    color: 'from-cyan-500 to-teal-500',
  },

  {
    title: 'Terverifikasi',
    value: '8.210',
    desc: 'Dokumen tervalidasi',
    icon: FolderCheck,
    color: 'from-emerald-500 to-green-500',
  },

  {
    title: 'Menunggu QC',
    value: '219',
    desc: 'Antrian quality control',
    icon: ShieldAlert,
    color: 'from-orange-500 to-amber-500',
  },

  {
    title: 'Storage',
    value: '1.2 TB',
    desc: 'Total penyimpanan',
    icon: HardDrive,
    color: 'from-violet-500 to-indigo-500',
  },
];

const chartData = [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 240 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 320 },
  { month: 'Mei', value: 260 },
  { month: 'Jun', value: 420 },
  { month: 'Jul', value: 510 },
];

const pieData = [
  { name: 'Aktif', value: 400 },
  { name: 'Inaktif', value: 300 },
  { name: 'Statis', value: 200 },
];

const COLORS = [
  '#14b8a6',
  '#3b82f6',
  '#f59e0b',
];

const activities = [
  {
    title: 'Dokumen berhasil diunggah',
    time: '5 menit lalu',
    icon: FileText,
  },

  {
    title: 'Metadata arsip diperbarui',
    time: '20 menit lalu',
    icon: ScanSearch,
  },

  {
    title: 'QC dokumen disetujui',
    time: '1 jam lalu',
    icon: FolderCheck,
  },

  {
    title: 'Arsip dipindahkan ke storage',
    time: '2 jam lalu',
    icon: Archive,
  },
];

/* ===============================
   COMPONENT
=============================== */

export default function Dashboard() {
  return (
    <div className="space-y-8 w-full overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div
          className="
            flex flex-col lg:flex-row
            items-start lg:items-center
            justify-between
            gap-5
          "
        >
          <div>
            <h1
              className="
                text-3xl lg:text-4xl
                font-bold
                text-slate-800
                tracking-tight
              "
            >
              Dashboard Utama
            </h1>

            <p className="text-slate-500 mt-2">
              Monitoring Sistem Alih Media Arsip
              Banten
            </p>
          </div>

          {/* Status */}
          <div
            className="
              flex items-center gap-3
              bg-white
              border border-slate-200
              px-5 py-3
              rounded-2xl
              shadow-sm
            "
          >
            <div
              className="
                w-11 h-11
                rounded-2xl
                bg-gradient-to-br
                from-teal-500
                to-cyan-500
                text-white
                flex items-center justify-center
              "
            >
              <TrendingUp size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Progress Bulan Ini
              </p>

              <h3 className="font-bold text-slate-800">
                +18.2%
              </h3>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          2xl:grid-cols-4
          gap-5
        "
      >
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -5,
              }}
              className="
                relative
                overflow-hidden
                bg-white
                rounded-3xl
                border border-slate-200
                p-6
                shadow-sm
                hover:shadow-xl
                transition-all duration-300
              "
            >
              {/* Glow */}
              <div
                className={`
                  absolute top-0 right-0
                  w-32 h-32
                  bg-gradient-to-br ${item.color}
                  opacity-10
                  blur-3xl
                `}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-7">
                  <div
                    className={`
                      bg-gradient-to-br ${item.color}
                      p-3 rounded-2xl
                      text-white
                      shadow-lg
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  <span
                    className="
                      text-xs
                      font-semibold
                      px-2 py-1
                      rounded-full
                      bg-emerald-100
                      text-emerald-600
                    "
                  >
                    +12%
                  </span>
                </div>

                <h3
                  className="
                    text-slate-500
                    text-sm
                    font-medium
                  "
                >
                  {item.title}
                </h3>

                <h2
                  className="
                    text-3xl
                    font-bold
                    text-slate-800
                    mt-2
                  "
                >
                  {item.value}
                </h2>

                <p
                  className="
                    text-xs
                    text-slate-400
                    mt-2
                  "
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div
        className="
          grid
          grid-cols-1
          2xl:grid-cols-3
          gap-6
        "
      >
        {/* Area Chart */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            2xl:col-span-2
            bg-white
            rounded-3xl
            border border-slate-200
            p-6
            shadow-sm
          "
        >
          <div
            className="
              flex items-center justify-between
              mb-8
            "
          >
            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-800
                "
              >
                Statistik Digitalisasi
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                Produksi alih media arsip bulanan
              </p>
            </div>

            <button
              className="
                bg-slate-100
                hover:bg-slate-200
                text-slate-700
                text-sm
                px-4 py-2
                rounded-xl
                transition
              "
            >
              Bulanan
            </button>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={chartData}>
                <XAxis dataKey="month" />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#14b8a6"
                  fill="#99f6e4"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-white
            rounded-3xl
            border border-slate-200
            p-6
            shadow-sm
          "
        >
          <div className="mb-6">
            <h2
              className="
                text-xl
                font-bold
                text-slate-800
              "
            >
              Distribusi Arsip
            </h2>

            <p
              className="
                text-sm
                text-slate-500
                mt-1
              "
            >
              Berdasarkan kategori arsip
            </p>
          </div>

          <div className="h-[260px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    )
                  )}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 mt-5">
            {pieData.map((item, index) => (
              <div
                key={index}
                className="
                  flex items-center justify-between
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      w-3 h-3 rounded-full
                    "
                    style={{
                      backgroundColor:
                        COLORS[index],
                    }}
                  />

                  <span className="text-slate-600">
                    {item.name}
                  </span>
                </div>

                <span
                  className="
                    font-semibold
                    text-slate-800
                  "
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <div
        className="
          grid
          grid-cols-1
          2xl:grid-cols-2
          gap-6
        "
      >
        {/* Activity */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-white
            rounded-3xl
            border border-slate-200
            p-6
            shadow-sm
          "
        >
          <div
            className="
              flex items-center gap-3
              mb-8
            "
          >
            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-blue-100
                text-blue-600
                flex items-center justify-center
              "
            >
              <Activity size={22} />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-800
                "
              >
                Aktivitas Terakhir
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Monitoring aktivitas sistem
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {activities.map(
              (item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    whileHover={{
                      x: 4,
                    }}
                    className="
                      flex items-start gap-4
                    "
                  >
                    <div
                      className="
                        w-11 h-11
                        rounded-2xl
                        bg-slate-100
                        flex items-center justify-center
                        text-slate-600
                      "
                    >
                      <Icon size={18} />
                    </div>

                    <div className="flex-1">
                      <div
                        className="
                          flex items-center justify-between
                          gap-3
                        "
                      >
                        <h4
                          className="
                            font-semibold
                            text-slate-700
                          "
                        >
                          {item.title}
                        </h4>

                        <span
                          className="
                            text-xs
                            text-slate-400
                          "
                        >
                          {item.time}
                        </span>
                      </div>

                      <div
                        className="
                          mt-3
                          border-b border-slate-100
                        "
                      />
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-white
            rounded-3xl
            border border-slate-200
            p-6
            shadow-sm
          "
        >
          <div className="mb-8">
            <h2
              className="
                text-xl
                font-bold
                text-slate-800
              "
            >
              Monitoring Sistem
            </h2>

            <p
              className="
                text-sm
                text-slate-500
                mt-1
              "
            >
              Progress alih media dan validasi
            </p>
          </div>

          <div className="space-y-7">
            {[
              {
                title:
                  'Progress Digitalisasi',
                value: '78%',
                color: 'bg-teal-500',
                width: '78%',
              },

              {
                title:
                  'Validasi Metadata',
                value: '62%',
                color: 'bg-blue-500',
                width: '62%',
              },

              {
                title: 'Quality Control',
                value: '91%',
                color: 'bg-emerald-500',
                width: '91%',
              },
            ].map((item, index) => (
              <div key={index}>
                <div
                  className="
                    flex items-center justify-between
                    mb-3
                  "
                >
                  <span
                    className="
                      text-sm
                      font-medium
                      text-slate-600
                    "
                  >
                    {item.title}
                  </span>

                  <span
                    className="
                      text-sm
                      font-bold
                      text-slate-800
                    "
                  >
                    {item.value}
                  </span>
                </div>

                <div
                  className="
                    w-full
                    h-3
                    rounded-full
                    bg-slate-200
                    overflow-hidden
                  "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: item.width,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className={`
                      h-full rounded-full
                      ${item.color}
                    `}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}