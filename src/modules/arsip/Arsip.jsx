import { SiteHeader } from "@/components/sidebar/site-header";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatRupiah, formatRupiahShort } from "@/lib/rupiah";
import { Download, Search, X } from "lucide-react";
import { useState } from "react";


// NOTE : KURANG SIDEBAR YANG UNTUK DETAIL NYA

export default function Arsip() {
    const [detailIsOpened, setDetailIsOpened] = useState(false);

    const [detailDeskripsi, setDetailDeskripsi] = useState("ringkasan");

    return (
        <>
            <SiteHeader breadcrumbs={[
                {
                    label: "Titian Market",
                },
                {
                    label: "Arsip",
                },
            ]} />
            <div className="px-3 py-2.5 min-h-screen">
                <div className="rounded-lg bg-[#fafafa] h-full px-4 py-3">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Arsip Tender</h1>
                        {/* button for export CSV */}
                        <Button variant="outline" size="icon" className={'w-fit flex gap-x-2 px-2 py-1'}>
                            <Download />
                            Export CSV
                        </Button>
                    </div>

                    {/* start of 3 grid */}
                    <div className="mt-6 grid grid-cols-3 gap-5">
                        {/* Total diarsipkan */}
                        <div className="rounded-lg bg-gray-100 h-[130px] flex flex-col gap-y-1 px-3 py-4">
                            <p className="">Total Diarsipkan</p>
                            <span className="text-4xl">2</span>
                            <p className="font-light text-sm">kontrak selesai</p>
                        </div>

                        {/* Total Nilai Kontrak */}
                        <div className="rounded-lg bg-gray-100 h-[130px] flex flex-col gap-y-1 px-3 py-4">
                            <p className="">Total Nilai Kontrak</p>
                            <span className="text-4xl">{formatRupiahShort(3000000)}</span>
                            <p className="font-light text-sm">Realisasi anggaran</p>
                        </div>

                        {/* Rata-rata Nilai */}
                        <div className="rounded-lg bg-gray-100 h-[130px] flex flex-col gap-y-1 px-3 py-4">
                            <p className="">Rata-rata Nilai</p>
                            <span className="text-4xl">{formatRupiahShort(1500000)}</span>
                            <p className="font-light text-sm">Per kontrak</p>
                        </div>
                    </div>
                    {/* end of 3 grid */}

                    <div className="mt-6 flex gap-x-3">
                        {/* search form */}
                        <Field className={'w-1/4'}>
                            <InputGroup>
                                <InputGroupAddon align="inline-start">
                                    <Search />
                                </InputGroupAddon>
                                <InputGroupInput id="input-group-url" placeholder="Cari Arsip..." />
                            </InputGroup>
                        </Field>

                        {/* button for sorting */}
                        <div className="flex gap-x-2">
                            {/* if active jadi biru */}
                            <Button variant="outline" size="icon" className={'w-fit flex gap-x-2 px-4 py-2 bg-blue-500 text-white'}>
                                Terbaru
                            </Button>
                            <Button variant="outline" size="icon" className={'w-fit flex gap-x-2 px-4 py-2'}>
                                Nilai Terbesar
                            </Button>
                        </div>




                    </div>

                    {/* start of list arsip */}
                    <div className="flex flex-col gap-y-4 mt-6">
                        {/* arsip */}
                        <div className="rounded-lg outline bg-gray-100 px-4 py-3 cursor-pointer" onClick={() => setDetailIsOpened(true)}>
                            <div className="flex flex-row gap-x-2">
                                {/* id */}
                                <span className="bg-gray-300 text-xs rounded-md p-1">
                                    TND-2024-BPOM-00318
                                </span>
                                {/* status */}
                                <span className="bg-red-300 outline outline-red-400 text-red-800 text-xs rounded-md p-1">
                                    berakhir
                                </span>

                                <span className="ml-auto">
                                    {formatRupiah(2000000)}
                                </span>
                            </div>

                            <div className="flex mt-2 ">
                                <h1>
                                    Pengadaan Alat Laboratorium Kimia BPOM
                                </h1>
                                <span className="ml-auto text-sm">Berakhir, 05 Mei 2025</span>
                            </div>

                            {/*  */}
                            <div className="flex flex-row gap-x-6 text-sm font-light">
                                <span>CV Labortech Indonesia</span>
                                <span>Pengadaan Barang</span>
                                <span>Badan Pengawas Obat dan Makanan (BPOM)</span>
                            </div>

                            {/* progress bar */}
                            <div className="flex mt-3 items-center">
                                <div className="w-11/12">
                                    <div className="rounded-md w-full h-2 w-full bg-gray-300 overflow-hidden">
                                        <div className="w-[80%] bg-blue-400 h-full rounded-md"></div>
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <span>80% selesai</span>
                                </div>
                            </div>


                            {/* aktivitas terakhir */}
                            <div className="mt-3 bg-gray-100 text-xs gap-x-1 flex bg-gray-200 px-3 py-2.5 rounded-md">
                                <span className="text-gray-600">Aktivitas terakhir:</span>
                                <span>Kontrak berakhir dan diserahkan</span>
                                <span className="text-gray-500 ml-2">5 Mei 2025</span>
                            </div>

                        </div>
                        {/* arsip */}
                        <div className="rounded-lg outline bg-gray-100 px-4 py-3">
                            <div className="flex flex-row gap-x-2">
                                {/* id */}
                                <span className="bg-gray-300 text-xs rounded-md p-1">
                                    TND-2024-BPOM-00318
                                </span>
                                {/* status */}
                                <span className="bg-red-300 outline outline-red-400 text-red-800 text-xs rounded-md p-1">
                                    berakhir
                                </span>

                                <span className="ml-auto">
                                    {formatRupiah(2000000)}
                                </span>
                            </div>

                            <div className="flex mt-2 ">
                                <h1>
                                    Pengadaan Alat Laboratorium Kimia BPOM
                                </h1>
                                <span className="ml-auto text-sm">Berakhir, 05 Mei 2025</span>
                            </div>

                            {/*  */}
                            <div className="flex flex-row gap-x-6 text-sm font-light">
                                <span>CV Labortech Indonesia</span>
                                <span>Pengadaan Barang</span>
                                <span>Badan Pengawas Obat dan Makanan (BPOM)</span>
                            </div>

                            {/* progress bar */}
                            <div className="flex mt-3 items-center">
                                <div className="w-11/12">
                                    <div className="rounded-md w-full h-2 w-full bg-gray-300 overflow-hidden">
                                        <div className="w-[80%] bg-blue-400 h-full rounded-md"></div>
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <span>80% selesai</span>
                                </div>
                            </div>


                            {/* aktivitas terakhir */}
                            <div className="mt-3 bg-gray-100 text-xs gap-x-1 flex bg-gray-200 px-3 py-2.5 rounded-md">
                                <span className="text-gray-600">Aktivitas terakhir:</span>
                                <span>Kontrak berakhir dan diserahkan</span>
                                <span className="text-gray-500 ml-2">5 Mei 2025</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* start of details (right sidebar) */}
            {detailIsOpened && <>
                <div className={`fixed inset-0 z-[9999999] flex justify-end bg-black/10 backdrop-blur-xs transition-opacity duration-300 ${detailIsOpened ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    {/* backdrop */}
                    <div className="w-8/12 h-full"
                        onClick={() => setDetailIsOpened(false)} />

                    {/* sidebar */}
                    <div
                        className={`w-full md:w-4/12 h-full border-l bg-white px-6 py-4 transition-transform duration-1000 delay-300 ease-in-out ${detailIsOpened ? "translate-x-0" : "translate-x-full"} `} >
                        <div className="justify-between flex items-center">
                            <span className="flex gap-x-2">
                                {/* id */}
                                <span className="bg-gray-300 text-xs rounded-md p-1">
                                    TND-2024-BPOM-00318
                                </span>
                                {/* status */}
                                <span className="bg-red-300 outline outline-red-400 text-red-800 text-xs rounded-md p-1">
                                    berakhir
                                </span>
                            </span>
                            <X className="cursor-pointer hover:bg-gray-50" onClick={() => setDetailIsOpened(false)} />
                        </div>
                        <div className="mt-4">
                            {/* judul */}
                            <h2>
                                Pengadaan Alat Laboratorium Kimia BPOM
                            </h2>
                            {/*  */}
                            <h3 className="text-xs text-gray-500">Badan Pengawas Obat dan Makanan (BPOM)</h3>
                        </div>

                        {/* progress */}
                        <div className="mt-4">
                            <span className="flex justify-between">
                                <span className="text-xs">Progress Pelaksanaan</span>
                                <span className="text-sm">80%</span>
                            </span>
                            <div className="rounded-lg h-2 w-full bg-gray-400 overflow-clip">
                                <div className="w-[80%] h-full bg-blue-400">

                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-x-2">
                            <Button variant="outline" size="icon" className={`w-fit flex gap-x-2 px-4 py-2 ${detailDeskripsi === 'ringkasan' ? 'bg-blue-500 text-white' : ''}`} onClick={() => setDetailDeskripsi("ringkasan")}>
                                Ringkasan
                            </Button>
                            <Button variant="outline" size="icon" className={`w-fit flex gap-x-2 px-4 py-2 ${detailDeskripsi === 'dokumen' ? 'bg-blue-500 text-white' : ''}`} onClick={() => setDetailDeskripsi("dokumen")}>
                                Dokumen (2)
                            </Button>
                            <Button variant="outline" size="icon" className={`w-fit flex gap-x-2 px-4 py-2 ${detailDeskripsi === 'riwayat' ? 'bg-blue-500 text-white' : ''}`} onClick={() => setDetailDeskripsi("riwayat")}>
                                Riwayat (5)
                            </Button>
                        </div>

                        <div className="border-b inset-0 my-4" />

                        {
                            detailDeskripsi === "ringkasan" &&
                            <div className="py-4 overflow-y-auto">
                                <div className="grid grid-cols-2 gap-x-4 px-0.5">
                                    {/* nilai kontrak */}
                                    <div className="rounded-lg flex flex-col gap-y-0.5 px-4 py-6 bg-gray-100 outline">
                                        <span className="text-xs">Nilai Kontrak</span>
                                        <span>{formatRupiah(2340000000)}</span>
                                    </div>
                                    {/*  */}
                                    <div className="rounded-lg flex flex-col gap-y-0.5 px-4 py-6 bg-gray-100 outline">
                                        <span className="text-xs">Masa Berlaku</span>
                                        <span>2024-11-05 – 2025-05-05</span>
                                    </div>
                                </div>

                                {/* deskripsi proyek */}
                                <div className="mt-4">
                                    <span className="text-gray-600 text-sm">Deskripsi Proyek</span>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora et quisquam ullam eum cupiditate ipsa dignissimos cumque, possimus vero nostrum dicta recusandae esse eos quibusdam blanditiis autem fuga, consequuntur alias!</p>
                                </div>

                                {/* deskripsi proyek */}
                                <div className="mt-4">
                                    <span className="text-gray-600 text-sm">Informasi Umum</span>
                                    <Table >
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium text-gray-700">Kategori</TableCell>
                                                <TableCell className="text-left">Pengadaan Barang</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium text-gray-700">Metode Pengadaan</TableCell>
                                                <TableCell className="text-left">Pengadaan Langsung</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium text-gray-700">Sumber Dana</TableCell>
                                                <TableCell className="text-left">APBN 2024</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium text-gray-700">Lokasi</TableCell>
                                                <TableCell className="text-left">Nasional (14 Balai Besar POM)</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium text-gray-700">Tanggal Kontrak</TableCell>
                                                <TableCell className="text-left">05 Nov 2024</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>


                                {/* Kontak PIC */}
                                <div className="mt-4 px-0.5">
                                    <span className="text-gray-600 text-sm">Kontak PIC</span>
                                    <div className="outline rounded-md mt-1 px-4 py-6">
                                        <p className="text-lg">Sari Dewi, S.si</p>
                                        <p className="text-sm">sari.dewi@bpom.go.id</p>
                                        <p className="text-sm">+62 21 4244 691</p>
                                    </div>
                                </div>

                                {/* Perusahaan Pemenang */}
                                <div className="mt-4 px-0.5">
                                    <span className="text-gray-600 text-sm">Perusahaan Pemenang</span>
                                    <div className="outline rounded-md mt-1 px-4 py-6">
                                        <p className="text-lg">CV Labortech Indonesia</p>
                                        <p className="text-sm"><span className="text-gray-500">Alamat:</span> Jl. Raya Pasar Minggu No. 56, Jakarta Selatan</p>
                                        <p className="text-sm"><span className="text-gray-500">NPWP:</span> 72.345.678.9-012.000</p>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            detailDeskripsi === "dokumen" &&
                            <div className="pb-4 overflow-y-auto">
                                <p className="text-sm text-gray-600">2 dokumen terlampir</p>
                                
                            </div>
                        }
                        
                        {
                            detailDeskripsi === "riwayat" &&
                            <div className="pb-4 overflow-y-auto">
                                <p className="text-sm text-gray-600">2 dokumen terlampir</p>

                            </div>
                        }

                    </div>
                </div>
            </>
            }
            {/* end of details (right sidebar) */}
        </>
    )
}