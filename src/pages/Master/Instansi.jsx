import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import {
    Building2,
    Plus,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Sparkles,
    ShieldCheck,
    AlertCircle,
    Mail,
    Phone,
    Layers,
    CheckCircle2
} from 'lucide-react';

export default function Instansi() {
    // --- ENGINE STATE ---
    const [instansiList, setInstansiList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    // State Pagination berbasis server
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [totalData, setTotalData] = useState(0);

    // --- ENGINE LOGIC UPDATE: Form Data disesuaikan 100% dengan JSON Backend Baru ---
    const [formData, setFormData] = useState({
        nama: '',
        kode: '',
        tipe: 'asli',       // Default value sesuai opsi yang tersedia
        status: 'active',   // Default value sesuai opsi yang tersedia
        alamat: '',
        email: '',
        telepon: ''
    });

    // --- ENGINE LOGIC ---

    // Ambil data instansi dari backend dengan penanganan struktur data.items
    const fetchInstansi = async (page) => {
        setLoading(true);
        setStatus({ type: '', message: '' });
        try {
            const response = await axiosInstance.get(`/master/instansi?limit=${limit}&page=${page}`);
            const responseBody = response.data;

            // PARSING DATA DEFENSE: Membaca objek data.items dari backend
            if (responseBody && responseBody.data && Array.isArray(responseBody.data.items)) {
                setInstansiList(responseBody.data.items);
                setTotalData(responseBody.data.total || responseBody.data.items.length);
            } else if (responseBody && Array.isArray(responseBody.data)) {
                setInstansiList(responseBody.data);
                setTotalData(responseBody.total || responseBody.data.length);
            } else {
                setInstansiList([]);
                setTotalData(0);
            }

            setCurrentPage(page);
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.response?.data?.message || 'Gagal memuat master data instansi dari server.'
            });
            setInstansiList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstansi(currentPage);
    }, [currentPage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Simpan instansi baru ke backend via POST menggunakan 7 payload baru
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await axiosInstance.post('/master/instansi', {
                nama: formData.nama,
                kode: formData.kode,
                tipe: formData.tipe,
                status: formData.status,
                alamat: formData.alamat,
                email: formData.email,
                telepon: formData.telepon
            });

            setStatus({
                type: 'success',
                message: 'Master data instansi berhasil ditambahkan ke database!'
            });

            // Reset Form ke kondisi awal
            setFormData({
                nama: '',
                kode: '',
                tipe: 'asli',
                status: 'active',
                alamat: '',
                email: '',
                telepon: ''
            });

            fetchInstansi(1); // Refresh ke halaman 1 agar data terbaru muncul di tabel
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.response?.data?.message || 'Gagal menyimpan data instansi baru.'
            });
        } finally {
            setSubmitLoading(false);
        }
    };

    const totalPages = Math.ceil(totalData / limit) || 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* HERO BANNER */}
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#071739] via-[#0A2472] to-[#0EA5A4] p-8 text-white shadow-xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs">
                                <Sparkles size={14} /> Master Data Center
                            </div>
                            <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-300/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs">
                                <ShieldCheck size={14} /> 7 PARAMETERS READY
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Manajemen Data Instansi</h1>
                        <p className="mt-2 text-slate-200 text-sm max-w-xl leading-relaxed">
                            Kelola master data instansi atau satuan kerja daerah sebagai basis relasi
                            Foreign Key boks kontainer kearsipan fisik.
                        </p>
                    </div>
                    <div className="bg-white/10 border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl min-w-[180px] text-center xl:text-left">
                        <p className="text-xs text-slate-300 font-medium">Total Terdata</p>
                        <h2 className="text-3xl font-extrabold mt-1 text-teal-300">{totalData} <span className="text-sm font-normal text-white">Instansi</span></h2>
                    </div>
                </div>
            </div>

            {/* WORKSPACE GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

                {/* PANEL FORM INPUT (KIRI) */}
                <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                            <Building2 size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">Tambah Instansi</h3>
                            <p className="text-xs text-slate-500">Buat entitas satuan kerja baru</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Nama Instansi</label>
                            <input
                                type="text"
                                name="nama"
                                value={formData.nama}
                                onChange={handleInputChange}
                                placeholder="Contoh: Dinas Kesehatan Banten"
                                required
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Kode Singkatan</label>
                                <input
                                    type="text"
                                    name="kode"
                                    value={formData.kode}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: dinkes"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Telepon</label>
                                <div className="relative">
                                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        name="telepon"
                                        value={formData.telepon}
                                        onChange={handleInputChange}
                                        placeholder="0812345678"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-3 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Tipe</label>
                                <select
                                    name="tipe"
                                    value={formData.tipe}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition text-sm"
                                >
                                    <option value="asli">Asli</option>
                                    <option value="salinan">Salinan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition text-sm"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Resmi</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="dinkes@bantenprov.go.id"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Alamat Kantor</label>
                            <textarea
                                name="alamat"
                                value={formData.alamat}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Jl. Syekh Nawawi Al-Bantani..."
                                required
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition text-sm resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitLoading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-95 text-white font-medium py-3 rounded-xl transition shadow-md shadow-cyan-500/10 text-sm disabled:opacity-50"
                        >
                            {submitLoading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                            Simpan ke Master
                        </button>
                    </form>
                </div>

                {/* PANEL DATA TABEL / PAGINATION (KANAN) */}
                <div className="xl:col-span-2 bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden p-6 flex flex-col justify-between min-h-[560px]">

                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <h3 className="font-bold text-slate-800 text-lg">Database Instansi Terdaftar</h3>
                            {loading && <Loader2 className="animate-spin text-cyan-600" size={18} />}
                        </div>

                        {status.message && (
                            <div className={`p-4 rounded-xl text-xs flex items-center gap-2 border ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                <AlertCircle size={14} className="shrink-0" />
                                <span>{status.message}</span>
                            </div>
                        )}

                        {/* TABEL DATA */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                        <th className="pb-3 pl-2">ID/Kode</th>
                                        <th className="pb-3">Nama Instansi</th>
                                        <th className="pb-3">Kontak Info</th>
                                        <th className="pb-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-slate-50">
                                    <AnimatePresence mode="popLayout">
                                        {Array.isArray(instansiList) && instansiList.length > 0 ? (
                                            instansiList.map((ins) => (
                                                <motion.tr
                                                    key={ins.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="hover:bg-slate-50/80 transition"
                                                >
                                                    <td className="py-3.5 pl-2">
                                                        <span className="font-mono font-bold text-cyan-600 text-xs block">#{ins.id}</span>
                                                        <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1 py-0.5 rounded uppercase">{ins.kode || 'n/a'}</span>
                                                    </td>
                                                    <td className="py-3.5">
                                                        <span className="font-semibold text-slate-800 block">{ins.nama || ins.nama_instansi}</span>
                                                        <span className="text-[11px] text-slate-400 block truncate max-w-[200px]">{ins.alamat || '-'}</span>
                                                    </td>
                                                    <td className="py-3.5 text-xs">
                                                        <span className="text-slate-700 font-medium block">{ins.email || '-'}</span>
                                                        <span className="text-slate-400 block">{ins.telepon || '-'}</span>
                                                    </td>
                                                    <td className="py-3.5">
                                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${ins.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                                                            }`}>
                                                            {ins.status || 'active'}
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        ) : (
                                            !loading && (
                                                <tr>
                                                    <td colSpan="4" className="py-8 text-center text-slate-400 text-xs font-mono">
                                                        Belum ada master data instansi yang terekam.
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SERVER SIDE PAGINATION CONTROLLER */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6 text-xs">
                        <span className="text-slate-500 font-medium">
                            Menampilkan Halaman <span className="text-slate-800 font-bold">{currentPage}</span> dari <span className="text-slate-800 font-bold">{totalPages}</span>
                        </span>
                        <div className="inline-flex gap-2">
                            <button
                                type="button"
                                onClick={() => fetchInstansi(currentPage - 1)}
                                disabled={currentPage === 1 || loading}
                                className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => fetchInstansi(currentPage + 1)}
                                disabled={currentPage === totalPages || loading}
                                className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </motion.div>
    );
}