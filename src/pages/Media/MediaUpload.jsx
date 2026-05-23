import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { motion } from 'framer-motion';

import {
  Upload,
  FileText,
  ScanLine,
  Sparkles,
  CheckCircle2,
  FileImage,
  ChevronRight,
  ShieldCheck,
  Files,
  Activity,
  Clock3,
  FileCheck2,
} from 'lucide-react';

export default function MediaUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* HERO */}
      <div
        className="
          relative overflow-hidden
          rounded-[32px]
          bg-gradient-to-br
          from-[#071739]
          via-[#0B2B70]
          to-[#0EA5A4]
          p-8
          text-white
        "
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
          {/* LEFT */}
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                <Sparkles size={16} />
                Digitalisasi Arsip
              </div>

              <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-300/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                <CheckCircle2 size={16} />
                OCR READY
              </div>
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Upload Dokumen Arsip
            </h1>

            <p className="mt-4 text-slate-200 leading-relaxed text-lg">
              Upload hasil scan arsip fisik ke dalam sistem digital untuk
              proses OCR, indexing, dan quality control.
            </p>

            {/* Info */}
            <div className="mt-7 flex flex-wrap gap-4">
              <div className="bg-white/10 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl">
                <p className="text-xs text-slate-300">
                  Upload Session
                </p>

                <h3 className="font-bold mt-1">
                  UPS-2026-00021
                </h3>
              </div>

              <div className="bg-white/10 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl">
                <p className="text-xs text-slate-300">
                  Last Upload
                </p>

                <h3 className="font-bold mt-1">
                  08 Mei 2026 • 15:01 WIB
                </h3>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-4 min-w-[300px]">
            {[
              {
                title: 'Upload Hari Ini',
                value: '48',
              },
              {
                title: 'Pending QC',
                value: '16',
              },
              {
                title: 'OCR Success',
                value: '91%',
              },
              {
                title: 'Storage',
                value: '68%',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
                  bg-white/10
                  border border-white/10
                  backdrop-blur-md
                  rounded-3xl
                  p-5
                "
              >
                <p className="text-sm text-slate-300">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {item.value}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          {/* UPLOAD */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-7 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-14 h-14
                    rounded-3xl
                    bg-gradient-to-br
                    from-violet-500
                    to-fuchsia-500
                    flex items-center justify-center
                    shadow-lg shadow-violet-500/20
                  "
                >
                  <Upload className="text-white" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Upload File Arsip
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Upload PDF, JPG, atau PNG hasil digitalisasi.
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-sm font-semibold">
                <ShieldCheck size={18} />
                Sistem Aktif
              </div>
            </div>

            {/* Body */}
            <div className="p-7 space-y-6">
              {/* Dropzone */}
              <label
                className="
                  relative
                  border-2 border-dashed border-slate-300
                  hover:border-cyan-500
                  hover:shadow-xl hover:shadow-cyan-500/10
                  hover:scale-[1.01]
                  bg-slate-50
                  rounded-[32px]
                  p-12
                  flex flex-col items-center justify-center
                  text-center
                  cursor-pointer
                  transition-all duration-300
                  overflow-hidden
                "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 hover:opacity-100 transition" />

                <div className="relative z-10">
                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="
                      w-24 h-24
                      rounded-[28px]
                      bg-gradient-to-br
                      from-cyan-500
                      to-teal-500
                      flex items-center justify-center
                      mx-auto
                      shadow-2xl shadow-cyan-500/20
                    "
                  >
                    <FileImage
                      size={42}
                      className="text-white"
                    />
                  </motion.div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-800">
                    Drag & Drop File
                  </h3>

                  <p className="mt-2 text-slate-500">
                    atau klik untuk memilih file
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                    {['PDF', 'JPG', 'PNG', 'DOCX'].map((item) => (
                      <div
                        key={item}
                        className="
                          bg-slate-900
                          text-white
                          px-4 py-2
                          rounded-xl
                          text-xs
                          font-semibold
                        "
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-2xl shadow-lg shadow-cyan-500/20">
                    <Files size={18} />
                    Pilih File
                  </div>
                </div>

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* File Info */}
              {file && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-[28px] p-5">
                  <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-emerald-500 flex items-center justify-center">
                        <FileText className="text-white" />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">
                          {file.name}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          File berhasil dipilih dan siap diupload
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-2 rounded-2xl text-sm font-semibold">
                      <CheckCircle2 size={18} />
                      Ready
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-slate-600">
                        Upload Progress
                      </span>

                      <span className="font-semibold text-slate-800">
                        78%
                      </span>
                    </div>

                    <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="w-[78%] h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Nama Dokumen
                  </label>

                  <input
                    type="text"
                    placeholder="Masukkan nama dokumen"
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50
                      px-4 py-3.5
                      outline-none
                      focus:ring-4
                      focus:ring-cyan-100
                      focus:border-cyan-500
                      transition
                    "
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Kode Klasifikasi
                  </label>

                  <input
                    type="text"
                    placeholder="KD-2026"
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50
                      px-4 py-3.5
                      outline-none
                      focus:ring-4
                      focus:ring-cyan-100
                      focus:border-cyan-500
                      transition
                    "
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Jumlah Halaman
                  </label>

                  <input
                    type="number"
                    placeholder="0"
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50
                      px-4 py-3.5
                      outline-none
                      focus:ring-4
                      focus:ring-cyan-100
                      focus:border-cyan-500
                      transition
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* OCR */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-7 border-b border-slate-100 flex items-center gap-4">
              <div
                className="
                  w-14 h-14
                  rounded-3xl
                  bg-gradient-to-br
                  from-emerald-500
                  to-teal-500
                  flex items-center justify-center
                  shadow-lg shadow-emerald-500/20
                "
              >
                <ScanLine className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  OCR Result
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Hasil ekstraksi teks otomatis dari dokumen.
                </p>
              </div>
            </div>

            <div className="p-7">
              <textarea
                rows="8"
                placeholder="Hasil OCR akan tampil di sini..."
                className="
                  w-full
                  rounded-[28px]
                  border border-slate-200
                  bg-slate-50
                  px-5 py-5
                  outline-none
                  focus:ring-4
                  focus:ring-cyan-100
                  focus:border-cyan-500
                  transition
                  resize-none
                  text-sm
                  font-mono
                "
              />

              <div className="flex justify-end mt-6">
                <button
                  className="
                    flex items-center gap-2
                    bg-gradient-to-r
                    from-teal-500
                    to-cyan-500
                    hover:opacity-90
                    transition
                    text-white
                    px-6 py-3
                    rounded-2xl
                    shadow-lg shadow-cyan-500/20
                    font-medium
                  "
                >
                  Simpan Upload
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* OCR Status */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <Activity size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-800">
                  OCR Status
                </h3>

                <p className="text-sm text-slate-500">
                  Monitoring proses OCR
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                'Ready to Upload',
                'OCR Processing',
                'Indexing Metadata',
                'Waiting Quality Control',
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    flex items-center gap-3
                    bg-slate-50
                    border border-slate-100
                    rounded-2xl
                    px-4 py-4
                  "
                >
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />

                  <span className="font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Upload */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
                <FileCheck2 size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-800">
                  Recent Upload
                </h3>

                <p className="text-sm text-slate-500">
                  File terbaru yang diupload
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                'surat_keputusan_2026.pdf',
                'berita_acara_scan.png',
                'arsip_dinas_pendidikan.pdf',
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    flex items-center justify-between
                    bg-slate-50
                    border border-slate-100
                    rounded-2xl
                    px-4 py-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                      <FileText size={18} />
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-700 text-sm">
                        {item}
                      </h4>

                      <p className="text-xs text-slate-400 mt-1">
                        Uploaded Successfully
                      </p>
                    </div>
                  </div>

                  <CheckCircle2
                    size={18}
                    className="text-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-[32px] p-6 text-white relative overflow-hidden">
            <div className="absolute right-[-40px] bottom-[-40px] w-40 h-40 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Clock3 />

                <h3 className="text-xl font-bold">
                  Gunakan Scan Berkualitas
                </h3>
              </div>

              <p className="text-violet-100 leading-relaxed">
                Dokumen yang jelas dan tidak blur akan meningkatkan akurasi OCR
                serta mempercepat proses indexing digital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}