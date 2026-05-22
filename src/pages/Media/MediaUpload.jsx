import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  ScanLine,
  Save,
} from 'lucide-react';

export default function MediaUpload() {
  const [formData, setFormData] = useState({
    box_id: '',
    folder_id: '', // Ditambahkan sesuai endpoint API
    nama_dokumen: '',
    kode_klasifikasi: '',
    tanggal_arsip: '',
    no_arsip: '',
    keterangan: '',
    jumlah_halaman: '',
    ocr_result: '',
  });

  const [file, setFile] = useState(null);

  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Fungsi helper untuk mengubah format tanggal dari YYYY-MM-DD menjadi DD-MM-YYYY
  const formatDateForApi = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setStatus({
      type: '',
      message: '',
    });

    const data = new FormData();

    // Memasukkan data ke FormData secara eksplisit agar box_id & folder_id tidak ikut terkirim ke body
    data.append('nama_dokumen', formData.nama_dokumen);
    data.append('kode_klasifikasi', formData.kode_klasifikasi);
    data.append('tanggal_arsip', formatDateForApi(formData.tanggal_arsip)); // Format disesuaikan
    data.append('no_arsip', formData.no_arsip);
    data.append('keterangan', formData.keterangan);
    data.append('jumlah_halaman', formData.jumlah_halaman);
    data.append('ocr_result', formData.ocr_result);

    if (file) {
      data.append('file', file);
    }

    // FIXED: Mengubah key pengambilan token dari 'token_operator' menjadi 'token'
    // agar sinkron dengan useAuthStore dan kode Login yang baru
    const token = localStorage.getItem('token');

    try {
      // Endpoint disesuaikan dengan koleksi Restfox: /alih-media/box/{box_id}/folder/{folder_id}/dokumen
      await axiosInstance.post(
        `/alih-media/box/${formData.box_id}/folder/${formData.folder_id}/dokumen`,
        data,
        {
          // Tambahkan header Authorization Bearer bersama dengan multipart/form-data
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // Memasukkan token yang sudah sinkron
          },
        }
      );

      setStatus({
        type: 'success',
        message: 'Dokumen berhasil diunggah dan di-index!',
      });

      setFormData({
        box_id: '',
        folder_id: '', // Reset folder_id juga
        nama_dokumen: '',
        kode_klasifikasi: '',
        tanggal_arsip: '',
        no_arsip: '',
        keterangan: '',
        jumlah_halaman: '',
        ocr_result: '',
      });

      setFile(null);
      
      // Reset input file secara manual
      if (e.target.elements.file) {
        e.target.elements.file.value = null;
      }

    } catch (err) {
      setStatus({
        type: 'error',
        message:
          err.response?.data?.message ||
          'Gagal mengunggah dokumen. Silakan periksa kembali session/token Anda.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Upload & Indexing Arsip
        </h1>

        <p className="text-slate-500 mt-2">
          Proses digitalisasi dokumen fisik ke sistem SAMA-BANTEN
        </p>
      </div>

      {/* Alert */}
      {status.message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 rounded-2xl border text-sm font-medium
          ${
            status.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {status.message}
        </motion.div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 lg:p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
                <FileText size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Informasi Arsip
                </h2>

                <p className="text-sm text-slate-500">
                  Lengkapi metadata dokumen
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Box ID */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ID Boks Kontainer
                </label>

                <input
                  type="text"
                  name="box_id"
                  value={formData.box_id}
                  onChange={handleInputChange}
                  placeholder="Contoh: 4"
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                  required
                />
              </div>

              {/* Folder ID */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ID Folder
                </label>

                <input
                  type="text"
                  name="folder_id"
                  value={formData.folder_id}
                  onChange={handleInputChange}
                  placeholder="Contoh: 3"
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                  required
                />
              </div>

              {/* No Arsip */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nomor Arsip
                </label>

                <input
                  type="text"
                  name="no_arsip"
                  value={formData.no_arsip}
                  onChange={handleInputChange}
                  placeholder="Contoh: 123_ARSIP"
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                  required
                />
              </div>

              {/* Nama Dokumen */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nama Dokumen
                </label>

                <input
                  type="text"
                  name="nama_dokumen"
                  value={formData.nama_dokumen}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama dokumen"
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                  required
                />
              </div>

              {/* Kode */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Kode Klasifikasi
                </label>

                <input
                  type="text"
                  name="kode_klasifikasi"
                  value={formData.kode_klasifikasi}
                  onChange={handleInputChange}
                  placeholder="Contoh: KD-125"
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                  required
                />
              </div>

              {/* Tanggal */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tanggal Arsip
                </label>

                <input
                  type="date"
                  name="tanggal_arsip"
                  value={formData.tanggal_arsip}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                  required
                />
              </div>

              {/* Jumlah Halaman */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Jumlah Halaman
                </label>

                <input
                  type="number"
                  name="jumlah_halaman"
                  value={formData.jumlah_halaman}
                  onChange={handleInputChange}
                  placeholder="Masukkan jumlah halaman"
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Upload */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-violet-100 text-violet-600 p-3 rounded-2xl">
                <Upload size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  File Dokumen
                </h2>

                <p className="text-sm text-slate-500">
                  Upload hasil scan PDF atau gambar
                </p>
              </div>
            </div>

            <label className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition cursor-pointer bg-slate-50">
              <Upload
                className="text-slate-400 mb-4"
                size={42}
              />

              <h3 className="font-semibold text-slate-700">
                Klik untuk upload file
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                PDF, JPG, PNG
              </p>

              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </label>

            {file && (
              <div className="mt-4 bg-slate-100 rounded-2xl p-4 text-sm text-slate-700">
                File dipilih:
                <span className="font-semibold ml-2">
                  {file.name}
                </span>
              </div>
            )}
          </div>

          {/* OCR */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl">
                <ScanLine size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Hasil OCR
                </h2>

                <p className="text-sm text-slate-500">
                  Ekstraksi teks otomatis dokumen
                </p>
              </div>
            </div>

            <textarea
              name="ocr_result"
              value={formData.ocr_result}
              onChange={handleInputChange}
              rows="6"
              placeholder="Isi hasil OCR..."
              className="w-full border border-slate-300 rounded-3xl px-4 py-4 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition font-mono text-sm"
            />
          </div>

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 disabled:bg-slate-400"
          >
            <Save size={20} />

            {loading
              ? 'Sedang Memproses...'
              : 'Simpan & Upload Dokumen'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}