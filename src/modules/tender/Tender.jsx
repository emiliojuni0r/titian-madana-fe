import { SiteHeader } from "@/components/sidebar/site-header";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { Download, Search, X } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { formatRupiah } from "@/lib/rupiah";

export default function Tender() {
    const categories = [
        { label: "Teknologi Informasi", value: "teknologi_informasi" },
        { label: "Konstruksi", value: "konstruksi" },
        { label: "Jasa Konsultasi", value: "jasa_konsultasi" },
    ]

    const status = [
        { label: "Teknologi Informasi", value: "teknologi_informasi" },
        { label: "Konstruksi", value: "konstruksi" },
        { label: "Jasa Konsultasi", value: "jasa_konsultasi" },
    ]

    const tenders = [
        {
            id: 1,
            namaTender: "Audit Eksternal Laporan Keuangan BUMN",
            kategori: "Jasa Konsultansi",
            kontak: "Prof. Hadi Susanto, Ak.",
            tanggal: "10 Okt 2024",
            nilaiKontrak: "Rp 920.000.000",
            masaBerlaku: "2024-10-10 – 2025-04-10",
            perusahaan: "KAP Purwantono & Rekan",
            status: "Berakhir",
            progress: "100%",
        },
        {
            id: 2,
            namaTender: "Konstruksi Jembatan Layang Gatot Subroto",
            kategori: "Konstruksi",
            kontak: "Ir. Budi Santoso",
            tanggal: "20 Jan 2025",
            nilaiKontrak: "Rp 87.200.000.000",
            masaBerlaku: "2025-01-20 – 2025-12-20",
            perusahaan: "PT Wijaya Karya Infrastruktur",
            status: "Aktif",
            progress: "38%",
        },
        {
            id: 3,
            namaTender: "Layanan Konsultansi IT Kementerian Keuangan",
            kategori: "Jasa Konsultansi",
            kontak: "Agung Prasetyo, M.Kom",
            tanggal: "01 Feb 2025",
            nilaiKontrak: "Rp 1.850.000.000",
            masaBerlaku: "2025-02-01 – 2025-08-01",
            perusahaan: "PT Andalan Teknologi",
            status: "Segera Berakhir",
            progress: "80%",
        },
        {
            id: 4,
            namaTender: "Pembangunan Sistem Irigasi Teknis",
            kategori: "Konstruksi",
            kontak: "Ir. Santika Wijayanti",
            tanggal: "01 Jun 2025",
            nilaiKontrak: "Rp 28.600.000.000",
            masaBerlaku: "2025-06-01 – 2026-06-01",
            perusahaan: "PT Hutama Karya Infrastruktur",
            status: "Aktif",
            progress: "10%",
        },
        {
            id: 5,
            namaTender: "Pengadaan Alat Laboratorium Kimia BPOM",
            kategori: "Pengadaan Barang",
            kontak: "Sari Dewi, S.Si",
            tanggal: "05 Nov 2024",
            nilaiKontrak: "Rp 2.340.000.000",
            masaBerlaku: "2024-11-05 – 2025-05-05",
            perusahaan: "CV Labortech Indonesia",
            status: "Berakhir",
            progress: "100%",
        },
        {
            id: 6,
            namaTender: "Pengadaan Kendaraan Dinas Operasional",
            kategori: "Pengadaan Barang",
            kontak: "Fitri Nurhaliza",
            tanggal: "25 Mar 2025",
            nilaiKontrak: "Rp 3.200.000.000",
            masaBerlaku: "2025-03-25 – 2025-06-25",
            perusahaan: "PT Astra International Tbk",
            status: "Segera Berakhir",
            progress: "90%",
        },
        {
            id: 7,
            namaTender: "Pengadaan Peralatan Medis Puskesmas",
            kategori: "Pengadaan Barang",
            kontak: "dr. Ayu Rahayu",
            tanggal: "30 Jan 2025",
            nilaiKontrak: "Rp 1.640.000.000",
            masaBerlaku: "2025-01-30 – 2025-07-30",
            perusahaan: "PT Mitra Keluarga Medika",
            status: "Segera Berakhir",
            progress: "75%",
        },
        {
            id: 8,
            namaTender: "Pengadaan Sistem Informasi Manajemen Rumah Sakit",
            kategori: "Teknologi Informasi",
            kontak: "dr. Hendra Kusuma",
            tanggal: "12 Mar 2025",
            nilaiKontrak: "Rp 4.750.000.000",
            masaBerlaku: "2025-03-12 – 2025-09-12",
            perusahaan: "PT Solusi Digital Nusantara",
            status: "Aktif",
            progress: "65%",
        },
    ]

    const [isDetailOpened, setIsDetailOpened] = useState(false);

    const [detailDeskripsi, setDetailDeskripsi] = useState("ringkasan");

    return (
        <>
            <SiteHeader
                breadcrumbs={[
                    { label: "Tender" },
                    { label: "Daftar tender" }
                ]}
            />
            <div className="px-3 py-2.5 min-h-screen">
                <div className="rounded-lg bg-stone-100 h-full px-3 py-4">

                    {/* title, search form, and export button */}
                    <div className="flex flex-col md:justify-between">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-lg md:text-2xl font-bold">Daftar Tender</h1>
                            {/* button for export CSV */}
                            <Button variant="outline" size="icon" className={'w-fit md:hidden flex gap-x-2 px-2 py-1 text-xs md:text-sm ml-auto md:ml-0'}>
                                <Download />
                                Export CSV
                            </Button>
                        </div>
                        <div className="flex flex-col-reverse md:flex-row gap-2 mt-2 md:mt-0">
                            {/* search form */}
                            <Field className={'md:ml-auto md:w-1/4'}>
                                <InputGroup>
                                    <InputGroupAddon align="inline-start">
                                        <Search />
                                    </InputGroupAddon>
                                    <InputGroupInput id="input-group-url" placeholder="Cari nama, perusahaan, kontak" />
                                </InputGroup>
                            </Field>

                            {/* button for export CSV (hidden in mobile)*/}
                            <Button variant="outline" size="icon" className={'w-fit hidden md:flex gap-x-2 px-2 py-1 text-xs md:text-sm ml-auto md:ml-0'}>
                                <Download />
                                Export CSV
                            </Button>
                        </div>
                    </div>

                    {/* start filter */}
                    <div className="flex flex-col md:flex-row gap-x-4 md:items-center px-2 py-1.5 md:px-4 md:py-3 rounded-lg bg-white mt-2 md:mt-4">
                        <span>Filter :</span>
                        <div className="flex flex-col md:flex-row gap-x-4 gap-y-1 md:w-[30%]">
                            <Field>
                                <NativeSelect>
                                    <NativeSelectOption value="">Kategori</NativeSelectOption>
                                    <NativeSelectOption value="apple">Apple</NativeSelectOption>
                                    <NativeSelectOption value="banana">Banana</NativeSelectOption>
                                    <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
                                    <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
                                </NativeSelect>
                            </Field>
                            <Field>
                                <NativeSelect>
                                    <NativeSelectOption value="">Status</NativeSelectOption>
                                    <NativeSelectOption value="apple">Apple</NativeSelectOption>
                                    <NativeSelectOption value="banana">Banana</NativeSelectOption>
                                    <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
                                    <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
                                </NativeSelect>
                            </Field>
                        </div>
                    </div>
                    {/* ebd filter */}

                    {/* start of table */}
                    <div className="flex gap-x-4 items-center px-4 py-3 rounded-lg bg-white mt-4">
                        <Table className={'overflow-x-auto'}>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]!">
                                        <input type="checkbox" />
                                    </TableHead>
                                    <TableHead className="w-[100px]">Nama Tender</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Kontak</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Nilai Kontrak</TableHead>
                                    <TableHead>Masa Berlaku</TableHead>
                                    <TableHead>Perusahaan</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tenders.map((tender) => (
                                    <TableRow key={tender.id}>
                                        <TableCell>
                                            <input type="checkbox" />
                                        </TableCell>
                                        <TableCell className="font-medium w-[58px]">
                                            {tender.namaTender}
                                        </TableCell>
                                        <TableCell>
                                            {tender.kategori}
                                        </TableCell>
                                        <TableCell>
                                            {tender.kontak}
                                        </TableCell>
                                        <TableCell>
                                            {tender.tanggal}
                                        </TableCell>
                                        <TableCell>
                                            {tender.nilaiKontrak}
                                        </TableCell>
                                        <TableCell>
                                            {tender.masaBerlaku}
                                        </TableCell>
                                        <TableCell>
                                            {tender.perusahaan}
                                        </TableCell>
                                        <TableCell>
                                            {tender.status}
                                        </TableCell>
                                        <TableCell>
                                            {tender.progress}
                                        </TableCell>
                                        <TableCell>
                                            <Button  variant="link" className="px-0 cursor-pointer" onClick={() => setIsDetailOpened(true)}>
                                                Detail
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {/* end of table */}

                    <div className="px-4 py-3 flex flex-col md:flex-row justify-center gap-y-1 md:justify-between bg-white rounded-b-lg text-sm">
                        <span className="mx-auto md:mx-0">Halaman 1 dari 2 - total 12</span>

                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>

                        <Field orientation="horizontal" className="w-fit mx-auto md:mx-0">
                            <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
                            <Select defaultValue="10">
                                <SelectTrigger className="w-20" id="select-rows-per-page">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent align="start">
                                    <SelectGroup>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                </div>
            </div>


            {/* start of details (right sidebar) */}
            {isDetailOpened && <>
                <div className={`fixed inset-0 z-[9999999] flex justify-end bg-black/10 backdrop-blur-xs transition-opacity duration-300 ${isDetailOpened ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    {/* backdrop */}
                    <div className="w-8/12 hidden md:flex h-full"
                        onClick={() => setIsDetailOpened(true)} />

                    {/* sidebar */}
                    <div
                        className={`w-full lg:w-4/12 overflow-y-auto h-full border-l bg-white px-6 py-4 transition-transform duration-1000 delay-300 ease-in-out ${isDetailOpened ? "translate-x-0" : "translate-x-full"} `} >
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
                            <X className="cursor-pointer hover:bg-gray-50" onClick={() => setIsDetailOpened(false)} />
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

                        <div className="mt-4 flex gap-x-2 overflow-x-auto">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 px-0.5">
                                    {/* nilai kontrak */}
                                    <div className="rounded-lg flex flex-col gap-y-0.5 px-4 py-3 md:py-6 bg-gray-100 outline">
                                        <span className="text-xs">Nilai Kontrak</span>
                                        <span>{formatRupiah(2340000000)}</span>
                                    </div>
                                    {/*  */}
                                    <div className="rounded-lg flex flex-col gap-y-0.5 px-4 py-3 md:py-6 bg-gray-100 outline">
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