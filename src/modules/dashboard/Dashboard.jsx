import { SiteHeader } from "@/components/sidebar/site-header"
import { formatRupiah } from "@/lib/rupiah"
import { CalendarDays, ClipboardCheck, ClipboardList, HandCoins, ListClock, OctagonAlert, TriangleAlert } from "lucide-react"


export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export default function Page() {
    return (
        <>
            <SiteHeader
                breadcrumbs={[
                    {
                        label: "Dashboard",
                    },
                ]}
            />

            <div className="px-3 py-2.5 min-h-screen">
                <div className="rounded-lg bg-[#fafafa] h-full px-2 py-3">
                    <h1 className="text-2xl font-bold">Selamat Datang Kembali, nama_user</h1>
                    <div className="flex flex-row gap-x-2 items-center">
                        <CalendarDays className="scale-75" />
                        <span className="text-sm font-semibold">Selasa, 29 September 2026</span>
                    </div>
                    {/* start of 4 grid */}
                    <div className="grid grid-cols-4 mt-6 gap-5">
                        {/* total tender */}
                        <div className="rounded-sm bg-gray-100 h-[130px] flex flex-col px-3 py-4">
                            <div className="flex flex-row justify-between items-center">
                                <p>Total Tender</p>
                                <ClipboardList />
                            </div>
                            <div className="my-auto">
                                <span className="font-semibold text-3xl">12</span>
                            </div>
                        </div>

                        {/* tender aktif */}
                        <div className="rounded-sm bg-gray-100 h-[130px] flex flex-col px-3 py-4">
                            <div className="flex flex-row justify-between items-center">
                                <p>Tender Aktif</p>
                                <ClipboardCheck />
                            </div>
                            <div className="my-auto">
                                <span className="font-semibold text-3xl">6</span>
                            </div>
                        </div>

                        {/* Segera Berakhir */}
                        <div className="rounded-sm bg-gray-100 h-[130px] flex flex-col px-3 py-4">
                            <div className="flex flex-row justify-between items-center">
                                <p>Segera Berakhir</p>
                                <TriangleAlert />
                            </div>
                            <div className="my-auto">
                                <span className="font-semibold text-3xl">1</span>
                            </div>
                        </div>

                        {/* total nilai */}
                        <div className="rounded-sm bg-gray-100 h-[130px] flex flex-col px-3 py-4">
                            <div className="flex flex-row justify-between items-center">
                                <p>Total Nilai</p>
                                <HandCoins />
                            </div>
                            <div className="my-auto">
                                <span className="font-semibold text-3xl">{formatRupiah(10000000)}</span>
                            </div>
                        </div>
                    </div>
                    {/* end of 4 grid */}


                    <div className="grid grid-cols-[2fr_1fr] gap-5 mt-6">
                        {/* start of nilai kontrak per kategori */}
                        <div className="bg-gray-100 rounded-sm h-[350px] px-3 py-4">
                            <h1 className="text-md font-semibold">Nilai Kontrak per Kategori</h1>
                            <h3 className="text-xs">Distribusi anggaran pengadaan</h3>

                            {/*  */}
                            <div className="flex flex-col gap-y-3 mt-4">
                                {/* example */}
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Kontruksi</span>
                                        <div className="flex gap-x-2 items-center">
                                            <span className="text-sm text-gray-500">3 tender</span>
                                            <span>{formatRupiah(20000000)}</span>
                                        </div>
                                    </div>

                                    {/* progress bar */}
                                    <div className="rounded-md w-full h-2 w-full bg-gray-300 overflow-hidden">
                                        <div className="w-[80%] bg-blue-400 h-full rounded-md"></div>
                                    </div>
                                </div>


                                {/* example 2 */}
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Teknologi Informasi</span>
                                        <div className="flex gap-x-2 items-center">
                                            <span className="text-sm text-gray-500">3 tender</span>
                                            <span>{formatRupiah(200000)}</span>
                                        </div>
                                    </div>

                                    {/* progress bar */}
                                    <div className="rounded-md w-full h-2 w-full bg-gray-300 overflow-hidden">
                                        <div className="w-[20%] bg-purple-400 h-full rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end of nilai kontrak per kategori */}
                        <div className="flex flex-col bg-gray-100 rounded-sm h-[350px] px-3 py-4">
                            <div className="flex gap-x-2 items-center">
                                <OctagonAlert />
                                <span className="font-semibold">Perlu Perhatian</span>
                            </div>
                            {/* list yang perlu diperhatikan */}
                            <div className="flex flex-col gap-y-1.5 mt-2">
                                <div className="rounded-md border hover:bg-gray-200 px-2.5 py-2 text-sm">
                                    <p className="font-semibold">Layanan abcdefghj</p>
                                    <span className="text-gray-600">Berakhir: 01 Agustus 2026</span>
                                </div>
                                <div className="rounded-md border hover:bg-gray-200 px-2.5 py-2 text-sm">
                                    <p className="font-semibold">Layanan abcdefghj</p>
                                    <span className="text-gray-600">Berakhir: 01 Agustus 2026</span>
                                </div>
                                <div className="rounded-md border hover:bg-gray-200 px-2.5 py-2 text-sm">
                                    <p className="font-semibold">Layanan abcdefghj</p>
                                    <span className="text-gray-600">Berakhir: 01 Agustus 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-[3fr_1fr] gap-5 mt-6">
                        {/* start of Tender terabru */}
                        <div className="bg-gray-100 rounded-sm h-[350px] px-3 py-4">
                            <h1 className="text-md font-semibold">Tender Terbaru</h1>

                            {/*  */}
                            <div className="flex flex-col mt-4">
                                {/* example */}
                                <div className="flex flex-row border-t py-2 px-1 hover:bg-gray-200">
                                    <div className="flex flex-col w-[60%]">
                                        <span className="text-md">Pembangunan Sistem Irigasi Teknis</span>
                                        <span className="font-light text-sm text-gray-700">PT Hutama Karya Infrastruktur</span>
                                    </div>
                                    <div className="w-[40%] flex flex-row justify-between items-center">
                                        {/* status */}
                                        <div className="border-2 border-green-300 bg-green-100 px-2 py-1 rounded-md">
                                            <p className="text-xs text-green-700">Aktif</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>{formatRupiah(20000000)}</span>
                                            <span className="text-sm text-right">01 Jun 2026</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row border-t py-2 px-1 hover:bg-gray-200">
                                    <div className="flex flex-col w-[60%]">
                                        <span className="text-md">Pembangunan Sistem Irigasi Teknis</span>
                                        <span className="font-light text-sm text-gray-700">PT Hutama Karya Infrastruktur</span>
                                    </div>
                                    <div className="w-[40%] flex flex-row justify-between items-center">
                                        {/* status */}
                                        <div className="border-2 border-yellow-300 bg-yellow-100 px-2 py-1 rounded-md">
                                            <p className="text-xs text-yellow-700">Segera Berakhir</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>{formatRupiah(20000000)}</span>
                                            <span className="text-sm text-right">01 Jun 2026</span>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        {/* end of tender terbaru */}

                        {/* start aktivitas terkini */}
                        <div className="flex flex-col bg-gray-100 rounded-sm h-[350px] px-3 py-4">
                            <div className="flex gap-x-2 items-center">
                                <ListClock />
                                <span className="font-semibold">Aktivitas Terkini</span>
                            </div>
                            {/* list yang perlu diperhatikan */}
                            <div className="flex flex-col gap-y-1.5 mt-2 relative">
                                {/* this is vertical line */}
                                <div className="h-[90%] top-[2%] my-auto w-0.5 bg-gray-400 inset text-transparent absolute left-[0.75%] z-0">.</div>

                                {/* activity timeline points */}
                                <div className="flex flex-row gap-x-3 items-center z-20">
                                    <div className="text-transparent rounded-full w-3 h-3 bg-blue-400 ">
                                        .
                                    </div>
                                    <div className="gap-y-0">
                                        {/* judul aktivitas */}
                                        <p className="text-sm">aktivitas 9</p>
                                        {/* tanggal */}
                                        <span className="text-xs text-gray-600">1 Agustus 2026</span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-row gap-x-3 items-center">
                                    <div className="text-transparent rounded-full w-3 h-3 bg-gray-400 ">
                                        .
                                    </div>
                                    <div className="gap-y-0">
                                        {/* judul aktivitas */}
                                        <p className="text-sm">Aktivitas 8</p>
                                        {/* tanggal */}
                                        <span className="text-xs text-gray-600">30 july 2026</span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-row gap-x-3 items-center">
                                    <div className="text-transparent rounded-full w-3 h-3 bg-gray-400 ">
                                        .
                                    </div>
                                    <div className="gap-y-0">
                                        {/* judul aktivitas */}
                                        <p className="text-sm">Aktivitas 7</p>
                                        {/* tanggal */}
                                        <span className="text-xs text-gray-600">20 july 2026</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* end of aktivitas terkini */}
                    </div>
                </div>
            </div>
        </>
    )
}
