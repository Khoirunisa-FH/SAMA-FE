import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { motion } from 'framer-motion';

import {
  FileText,
  Building2,
  MapPin,
  Archive,
  CalendarDays,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  BadgeCheck,
  FolderOpen,
  Clock3,
  Activity,
} from 'lucide-react';

export default function Registrasi() {
  // --- ENGINE LOGIC REGISTER BOX ---
  const [formData, setFormData] = useState({
    nomor_box: '',
    unit_kerja: '',
    virtual_path: '',
    lokasi: '',        // State lokasi tetap dipertahankan untuk dikirim ke backend
    instansi_id: '',
  });

  const [instansiList, setInstansiList] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Alur Data 1: Fetching master instansi saat halaman dimuat (Mounting)
  useEffect(() => {
    const getInstansiOptions = async () => {
      try {
        const response = await axiosInstance.get('/master/instansi?limit=100&page=1');
        // Defense logic parsing data sesuai struktur response .data.items
        if (response.data && response.data.data && Array.isArray(response.data.data.items)) {
          setInstansiList(response.data.data.items);
        } else if (response.data && Array.isArray(response.data.data)) {
          setInstansiList(response.data.data);
        }
      } catch (err) {
        console.error('Gagal mengambil data opsi instansi:', err);
      }
    };
    getInstansiOptions();
  }, []);

  // Handler perubahan nilai input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi submit data ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.instansi_id) {
      setStatus({ type: 'error', message: 'Silakan pilih Instansi terlebih dahulu!' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Mengirimkan parameter yang sudah disesuaikan dengan skema backend
      await axiosInstance.post('/alih-media/box', {
        nomor_box: formData.nomor_box,
        unit_kerja: formData.unit_kerja,
        lokasi: formData.lokasi,
        virtual_path: formData.virtual_path,
        instansi_id: parseInt(formData.instansi_id),
      });

      setStatus({
        type: 'success',
        message: 'Boks kontainer berhasil diregistrasikan ke dalam database sistem!',
      });

      // Reset form fields jika pengiriman sukses
      setFormData({ nomor_box: '', unit_kerja: '', lokasi: '', virtual_path: '', instansi_id: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Gagal meregistrasikan boks kontainer.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk membersihkan form secara manual
  const handleResetForm = (e) => {
    e.preventDefault();
    setFormData({ nomor_box: '', unit_kerja: '', lokasi: '', virtual_path: '', instansi_id: '' });
    setStatus({ type: '', message: '' });
  };

  // --- UI RENDER (100% MEMPERTAHANKAN DESAIN VISUAL ASLI) ---
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
          via-[#0A2472]
          to-[#0EA5A4]
          p-8
          text-white
        "
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
          {/* LEFT */}
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                <Sparkles size={16} />
                Sistem Alih Media Arsip
              </div>

              <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-300/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                <BadgeCheck size={16} />
                DIGITALIZATION READY
              </div>
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Registrasi Arsip Fisik
            </h1>

            <p className="mt-4 text-slate-200 leading-relaxed text-lg">
              Registrasi metadata arsip sebelum proses digitalisasi untuk
              memastikan identitas arsip dan lokasi penyimpanan tercatat dengan
              baik.
            </p>

            {/* Info */}
            <div className="mt-7 flex flex-wrap gap-4">
              <div className="bg-white/10 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl">
                <p className="text-xs text-slate-300">
                  ID Registrasi
                </p>

                <h3 className="font-bold mt-1">
                  REG-2026-00012
                </h3>
              </div>

              <div className="bg-white/10 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl">
                <p className="text-xs text-slate-300">
                  Last Saved
                </p>

                <h3 className="font-bold mt-1">
                  23 Mei 2026 • 15:37 WIB
                </h3>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-4 min-w-[300px]">
            {[
              { title: 'Total Arsip', value: '1.240' },
              { title: 'Box Aktif', value: '183' },
              { title: 'Pending Upload', value: '21' },
              { title: 'QC Hari Ini', value: '47' },
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
          {/* FORM */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-7 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-14 h-14
                    rounded-3xl
                    bg-gradient-to-br
                    from-teal-500
                    to-cyan-500
                    flex items-center justify-center
                    shadow-lg shadow-cyan-500/20
                  "
                >
                  <Archive className="text-white" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Form Registrasi
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Lengkapi informasi arsip fisik dengan benar.
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-sm font-semibold">
                <ShieldCheck size={18} />
                Sistem Aktif
              </div>
            </div>

            {/* Body Form */}
            <form onSubmit={handleSubmit} className="p-7 space-y-8">
              {status.message && (
                <div className={`p-4 rounded-2xl text-sm border ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  {status.message}
                </div>
              )}

              {/* BAGIAN 1: Informasi Arsip */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                    <FileText size={18} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Informasi Arsip
                    </h3>

                    <p className="text-sm text-slate-500">
                      Metadata utama arsip fisik
                    </p>
                  </div>
                </div>

                {/* Struktur Grid Atas menjadi lebih ringkas karena input Lokasi dipindah ke bawah */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Parameter 1: Nomor Box */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      Nomor Box
                    </label>

                    <input
                      type="text"
                      name="nomor_box"
                      value={formData.nomor_box}
                      onChange={handleInputChange}
                      placeholder="Contoh: E150"
                      required
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

                  {/* Parameter 2: Unit Kerja */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      Unit Kerja
                    </label>

                    <input
                      type="text"
                      name="unit_kerja"
                      value={formData.unit_kerja}
                      onChange={handleInputChange}
                      placeholder="Contoh: PUPR / SETDA"
                      required
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

                  {/* Parameter 3: Virtual Path Explorer */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      Virtual Path Explorer (Lokasi Direktori Digital)
                    </label>

                    <input
                      type="text"
                      name="virtual_path"
                      value={formData.virtual_path}
                      onChange={handleInputChange}
                      placeholder="Contoh: setda/uang-kopdar"
                      required
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
                        font-mono text-sm
                      "
                    />
                  </div>
                </div>
              </div>

              {/* BAGIAN 2: Penempatan & Relasi Instansi */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
                    <Building2 size={18} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Relasi Instansi & Lokasi
                    </h3>

                    <p className="text-sm text-slate-500">
                      Penentuan kepemilikan instansi dan lokasi simpan fisik
                    </p>
                  </div>
                </div>

                {/* Grid Bawah berisikan select instansi dan input lokasi aktif (Nomor Box Bawah Dihapus) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* SELECT INSTANSI */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      Instansi
                    </label>

                    <select
                      name="instansi_id"
                      value={formData.instansi_id}
                      onChange={handleInputChange}
                      required
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
                        text-sm
                      "
                    >
                      <option value="">Pilih Instansi</option>
                      {instansiList.map((ins) => (
                        <option key={ins.id} value={ins.id}>
                          {ins.nama || `Instansi ID ${ins.id}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* LOKASI SIMPAN (Pindahan dari atas, kini aktif menangkap input state boks) */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      Lokasi Simpan
                    </label>
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        name="lokasi"
                        value={formData.lokasi}
                        onChange={handleInputChange}
                        placeholder="Contoh: Lt 2 rak A5"
                        required
                        className="
                          w-full
                          rounded-2xl
                          border border-slate-200
                          bg-slate-50
                          pl-11 pr-4 py-3.5
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

              {/* BUTTON ACTIONS */}
              <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="
                    px-5 py-3
                    rounded-2xl
                    border border-slate-200
                    text-slate-700
                    hover:bg-slate-100
                    transition
                  "
                >
                  Reset Form
                </button>

                <button
                  type="submit"
                  disabled={loading}
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
                    disabled:from-slate-400 disabled:to-slate-500
                  "
                >
                  {loading ? 'Menyimpan...' : 'Simpan Registrasi'}
                  <ChevronRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Flow */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800">
              Workflow Digitalisasi
            </h3>

            <div className="mt-6 space-y-4">
              {[
                '01 Registrasi Arsip',
                '02 Upload Dokumen',
                '03 OCR & Indexing',
                '04 Quality Control',
                '05 Generate Berita Acara',
              ].map((step, index) => (
                <div
                  key={index}
                  className="
                    flex items-center gap-4
                    bg-slate-50
                    border border-slate-100
                    rounded-2xl
                    px-4 py-4
                  "
                >
                  <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                    <FolderOpen size={18} />
                  </div>

                  <h4 className="font-semibold text-slate-700">
                    {step}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Activity size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-800">
                  Status Arsip Hari Ini
                </h3>

                <p className="text-sm text-slate-500">
                  Monitoring registrasi harian
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { label: 'Registrasi Baru', value: '24', progress: 'w-[72%]' },
                { label: 'Pending Upload', value: '12', progress: 'w-[45%]' },
                { label: 'Menunggu QC', value: '7', progress: 'w-[30%]' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">
                      {item.label}
                    </span>

                    <span className="font-semibold text-slate-800">
                      {item.value}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`${item.progress} h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="bg-gradient-to-br from-cyan-500 to-teal-500 rounded-[32px] p-6 text-white relative overflow-hidden">
            <div className="absolute right-[-40px] bottom-[-40px] w-40 h-40 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Clock3 />

                <h3 className="text-xl font-bold">
                  Pastikan Metadata Valid
                </h3>
              </div>

              <p className="text-cyan-50 leading-relaxed">
                Data registrasi yang akurat akan mempermudah proses indexing,
                pencarian arsip, dan quality control digitalisasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}