import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export default function useMedia() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [documentList, setDocumentList] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);

    // State untuk melacak pagination terintegrasi backend
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10
    });

    // Alur 1: Fetch daftar dokumen dengan Server-Side Pagination
    const fetchDocuments = async (page = 1, limit = 10) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/alih-media/dokumen?page=${page}&limit=${limit}`);
            // Asumsi format respons data terstruktur dari backend
            setDocumentList(response.data.data || []);
            setPagination({
                total: response.data.total || 0,
                page: page,
                limit: limit
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal mengambil daftar dokumen.');
        } finally {
            setLoading(false);
        }
    };

    // Alur 2: Mengambil file dokumen asli via stream blob untuk preview
    const getDocumentPreview = async (dokumenId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/proxy/dokumen/${dokumenId}/media/original`, {
                responseType: 'blob', // Memaksa Axios membaca respons sebagai biner (file mentah)
            });

            // Mengubah file mentah blob menjadi URL virtual browser
            const fileUrl = URL.createObjectURL(response.data);
            setPreviewUrl(fileUrl);
        } catch (err) {
            setError('Gagal memuat berkas pratinjau dokumen.');
        } finally {
            setLoading(false);
        }
    };

    // Helper untuk membersihkan memori URL blob setelah preview ditutup
    const clearPreview = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    return {
        loading,
        error,
        documentList,
        pagination,
        previewUrl,
        fetchDocuments,
        getDocumentPreview,
        clearPreview
    };
}