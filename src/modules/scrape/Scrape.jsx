import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/sidebar/site-header";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RefreshCw, Play, AlertCircle, CheckCircle2 } from "lucide-react";
import scrapeService from "./scrapeService"; // Sesuaikan path

export default function Scrape() {
    // State untuk form parameter
    const [formData, setFormData] = useState({
        tahun: new Date().getFullYear(),
        tender: true,
        nontender: true,
        detail: false,
        limit: 10
    });

    // State untuk UI & Data
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [isScraping, setIsScraping] = useState(false);
    const [lastResult, setLastResult] = useState(null);
    const [error, setError] = useState(null);

    // Fetch riwayat saat komponen dimuat
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
            const response = await scrapeService.getHistory(20); // Ambil 20 data terakhir
            setHistory(response.data || []);
        } catch (err) {
            console.error("Gagal mengambil riwayat:", err);
        } finally {
            setLoadingHistory(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleStartScrape = async (e) => {
        e.preventDefault();
        setIsScraping(true);
        setLastResult(null);
        setError(null);

        try {
            const response = await scrapeService.startScrape(formData);
            if (response.status === 200) {
                setLastResult(response.data);
                fetchHistory(); // Refresh tabel riwayat setelah sukses
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Terjadi kesalahan saat memulai scraping.");
        } finally {
            setIsScraping(false);
        }
    };

    return (
        <>
            <SiteHeader breadcrumbs={[{ label: "Admin" }, { label: "Manual Scraping" }]} />
            
            <div className="px-3 py-2.5 min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    
                    {/* Kolom Kiri: Form Scraping */}
                    <div className="lg:col-span-1 bg-white rounded-lg p-5 shadow-sm h-fit">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Play size={18} className="text-blue-600" />
                            Konfigurasi Scraping
                        </h2>

                        <form onSubmit={handleStartScrape} className="flex flex-col gap-4">
                            <Field>
                                <FieldLabel htmlFor="tahun">Tahun Anggaran</FieldLabel>
                                <Input 
                                    id="tahun" name="tahun" type="number" 
                                    value={formData.tahun} onChange={handleInputChange} required 
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="limit">Limit (Maksimal data)</FieldLabel>
                                <Input 
                                    id="limit" name="limit" type="number" 
                                    value={formData.limit} onChange={handleInputChange} required 
                                />
                            </Field>

                            <div className="flex flex-col gap-2 p-3 bg-gray-50 border rounded-md">
                                <span className="text-sm font-medium">Opsi Target</span>
                                
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input 
                                        type="checkbox" name="tender" className="w-4 h-4 rounded border-gray-300"
                                        checked={formData.tender} onChange={handleInputChange} 
                                    />
                                    Scrape Tender
                                </label>
                                
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input 
                                        type="checkbox" name="nontender" className="w-4 h-4 rounded border-gray-300"
                                        checked={formData.nontender} onChange={handleInputChange} 
                                    />
                                    Scrape Non-Tender
                                </label>

                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input 
                                        type="checkbox" name="detail" className="w-4 h-4 rounded border-gray-300"
                                        checked={formData.detail} onChange={handleInputChange} 
                                    />
                                    Ambil Detail Pemenang
                                </label>
                            </div>

                            <Button type="submit" disabled={isScraping} className="mt-2 flex gap-2">
                                {isScraping ? (
                                    <><RefreshCw size={16} className="animate-spin" /> Memproses...</>
                                ) : (
                                    <><Play size={16} /> Mulai Scraping</>
                                )}
                            </Button>
                        </form>

                        {/* Alert Hasil Scraping Terbaru */}
                        {lastResult && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm">
                                <div className="flex items-center gap-2 text-green-700 font-bold mb-1">
                                    <CheckCircle2 size={16} /> Scraping Selesai
                                </div>
                                <ul className="list-disc list-inside text-green-800">
                                    <li>Ditemukan: {lastResult.records_found} data</li>
                                    <li>Data Baru: {lastResult.records_new} data</li>
                                    <li>Diperbarui: {lastResult.records_updated} data</li>
                                </ul>
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700 flex items-start gap-2">
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>

                    {/* Kolom Kanan: Tabel Riwayat */}
                    <div className="lg:col-span-2 bg-white rounded-lg p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Riwayat Scraping</h2>
                            <Button variant="outline" size="sm" onClick={fetchHistory} disabled={loadingHistory}>
                                <RefreshCw size={14} className={`mr-2 ${loadingHistory ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Waktu Selesai</TableHead>
                                        <TableHead>Target</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Hasil</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loadingHistory ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-8 text-gray-500">Memuat riwayat...</TableCell>
                                        </TableRow>
                                    ) : history.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-8 text-gray-500">Belum ada riwayat scraping.</TableCell>
                                        </TableRow>
                                    ) : (
                                        history.map((item, idx) => (
                                            <TableRow key={item.id || idx}>
                                                <TableCell className="text-sm whitespace-nowrap">
                                                    {item.finished_at ? new Date(item.finished_at).toLocaleString('id-ID') : '-'}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    Tahun: {item.tahun} <br/>
                                                    <span className="text-gray-500 capitalize">{item.jenis_paket || "Semua"}</span>
                                                </TableCell>
                                                <TableCell>
                                                    {item.status === 'success' || item.status === 'completed' ? (
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">Sukses</span>
                                                    ) : item.status === 'failed' || item.error ? (
                                                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium">Gagal</span>
                                                    ) : (
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium capitalize">{item.status || "Unknown"}</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-xs">
                                                    {item.error ? (
                                                        <span className="text-red-600 line-clamp-2" title={item.error}>{item.error}</span>
                                                    ) : (
                                                        <div className="flex flex-col gap-0.5 text-gray-600">
                                                            <span>Found: {item.records_found}</span>
                                                            <span>New: {item.records_new}</span>
                                                            <span>Updated: {item.records_updated}</span>
                                                        </div>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}