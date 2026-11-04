import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/sidebar/site-header"
import { 
    CalendarDays, 
    ClipboardCheck, 
    ClipboardList, 
    Handshake, 
    OctagonAlert, 
    ListClock,
    PackageSearch
} from "lucide-react"

import statisticService from "./statisticService" // Sesuaikan path jika berbeda
import { useAuthStore } from "@/stores/auth" // Untuk mengambil nama user

export default function Dashboard() {
    // 1. Ambil data user dari Zustand store
    const user = useAuthStore((state) => state.user);

    // 2. State untuk menampung data dari API
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // 3. Fetch data API saat halaman di-load
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await statisticService.getStats();
                setStats(response.data);
            } catch (error) {
                console.error("Gagal memuat statistik", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // 4. Format Tanggal Hari Ini
    const todayFormatted = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });

    // Helper untuk mengubah Object menjadi Array yang diurutkan dari nilai terbesar
    const sortObjectEntries = (obj) => {
        if (!obj) return [];
        return Object.entries(obj).sort((a, b) => b[1] - a[1]);
    };

    // Tampilan saat loading
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-pulse text-lg font-semibold">Memuat Dashboard...</div>
            </div>
        )
    }

    if (!stats) return null;

    return (
        <>
            <SiteHeader breadcrumbs={[{ label: "Dashboard" }]} />

            <div className="px-3 py-2.5 min-h-screen">
                <div className="rounded-lg bg-[#fafafa] h-full px-2 py-3">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Selamat Datang Kembali, {user?.full_name || user?.username || "Admin"}
                    </h1>
                    <div className="flex flex-row gap-x-1 md:gap-x-2 items-center mt-1 text-gray-600">
                        <CalendarDays className="scale-75" />
                        <span className="text-xs md:text-sm font-semibold">{todayFormatted}</span>
                    </div>

                    {/* --- START OF 4 WIDGET GRIDS --- */}
                    <div className="grid grid-cols-1 md:grid-cols-4 mt-4 md:mt-6 gap-5">
                        <div className="rounded-sm bg-gray-100 h-[100px] md:h-[130px] flex flex-col px-4 py-4">
                            <div className="flex flex-row justify-between items-center text-gray-600">
                                <p className="font-medium text-sm">Total Pengadaan</p>
                                <ClipboardList size={20}/>
                            </div>
                            <div className="my-auto text-blue-600">
                                <span className="font-semibold text-3xl md:text-4xl">{stats.total}</span>
                            </div>
                        </div>

                        <div className="rounded-sm bg-gray-100 h-[100px] md:h-[130px] flex flex-col px-4 py-4">
                            <div className="flex flex-row justify-between items-center text-gray-600">
                                <p className="font-medium text-sm">Tender</p>
                                <ClipboardCheck size={20}/>
                            </div>
                            <div className="my-auto text-indigo-600">
                                <span className="font-semibold text-3xl md:text-4xl">{stats.total_tender}</span>
                            </div>
                        </div>

                        <div className="rounded-sm bg-gray-100 h-[100px] md:h-[130px] flex flex-col px-4 py-4">
                            <div className="flex flex-row justify-between items-center text-gray-600">
                                <p className="font-medium text-sm">Non-Tender</p>
                                <PackageSearch size={20}/>
                            </div>
                            <div className="my-auto text-amber-600">
                                <span className="font-semibold text-3xl md:text-4xl">{stats.total_nontender}</span>
                            </div>
                        </div>

                        <div className="rounded-sm bg-gray-100 h-[100px] md:h-[130px] flex flex-col px-4 py-4">
                            <div className="flex flex-row justify-between items-center text-gray-600">
                                <p className="font-medium text-sm">Total Kontrak</p>
                                <Handshake size={20}/>
                            </div>
                            <div className="my-auto text-emerald-600">
                                <span className="font-semibold text-3xl md:text-4xl">{stats.total_kontrak}</span>
                            </div>
                        </div>
                    </div>
                    {/* --- END OF 4 WIDGET GRIDS --- */}


                    {/* --- START OF MIDDLE SECTION --- */}
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 mt-6">
                        {/* Distribusi Jenis Pengadaan (Progress Bar) */}
                        <div className="bg-gray-100 rounded-sm h-[300px] md:h-[350px] px-4 py-5 overflow-y-auto">
                            <h1 className="text-md font-semibold">Distribusi Jenis Pengadaan</h1>
                            <h3 className="text-xs text-gray-500">Berdasarkan total seluruh pengadaan</h3>

                            <div className="flex flex-col gap-y-4 mt-6">
                                {sortObjectEntries(stats.by_jenis_pengadaan).map(([kategori, jumlah], index) => {
                                    // Hitung persentase untuk lebar progress bar
                                    const percentage = Math.round((jumlah / stats.total) * 100) || 0;
                                    
                                    // Beri variasi warna bar berdasarkan index
                                    const colors = ["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500"];
                                    const barColor = colors[index % colors.length];

                                    return (
                                        <div key={kategori} className="flex flex-col gap-y-1.5">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">{kategori}</span>
                                                <div className="flex gap-x-2 items-center">
                                                    <span className="text-sm text-gray-500">{percentage}%</span>
                                                    <span className="font-semibold text-sm">{jumlah} paket</span>
                                                </div>
                                            </div>
                                            <div className="rounded-md w-full h-2 bg-gray-200 overflow-hidden">
                                                <div className={`${barColor} h-full rounded-md`} style={{ width: `${percentage}%` }}></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Statistik Berdasarkan Tahun (Menggantikan Perlu Perhatian) */}
                        <div className="flex flex-col bg-gray-100 rounded-sm h-[300px] md:h-[350px] px-4 py-5">
                            <div className="flex gap-x-2 items-center mb-4">
                                <OctagonAlert size={20} className="text-rose-600"/>
                                <span className="font-semibold">Statistik Tahun Anggaran</span>
                            </div>
                            <div className="flex flex-col gap-y-2 mt-2 overflow-y-auto">
                                {sortObjectEntries(stats.by_tahun).map(([tahun, jumlah]) => (
                                    <div key={tahun} className="rounded-md border bg-white px-3 py-3 text-sm flex justify-between items-center shadow-sm">
                                        <p className="font-semibold text-gray-700">Tahun {tahun}</p>
                                        <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-md text-xs font-bold">{jumlah} Data</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* --- END OF MIDDLE SECTION --- */}

                    
                    {/* --- START OF BOTTOM SECTION --- */}
                    <div className="grid grid-cols-1 mt-6">
                        {/* Status Pengadaan (Menggantikan Tender Terbaru & Aktivitas Terkini) */}
                        <div className="flex flex-col bg-gray-100 rounded-sm min-h-[350px] px-4 py-5">
                            <div className="flex gap-x-2 items-center mb-4">
                                <ListClock size={20} className="text-blue-600" />
                                <span className="font-semibold">Sebaran Status Tahap Pengadaan</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto">
                                {sortObjectEntries(stats.by_status).map(([status, jumlah]) => (
                                    <div key={status} className="rounded-md border bg-white hover:bg-gray-50 transition-colors px-4 py-3 text-sm flex justify-between items-start gap-4 shadow-sm">
                                        <p className="font-medium text-gray-700 line-clamp-2" title={status}>{status}</p>
                                        <span className="shrink-0 text-blue-700 bg-blue-50 px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap">
                                            {jumlah} Paket
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* --- END OF BOTTOM SECTION --- */}

                </div>
            </div>
        </>
    )
}