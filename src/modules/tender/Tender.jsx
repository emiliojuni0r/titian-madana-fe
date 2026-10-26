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

import { Download, Search } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">Daftar Tender</h1>
                        <div className="flex gap-x-2">
                            {/* search form */}
                            <Field>
                                <InputGroup>
                                    <InputGroupAddon align="inline-start">
                                        <Search />
                                    </InputGroupAddon>
                                    <InputGroupInput id="input-group-url" placeholder="Cari nama, perusahaan, kontak" />
                                </InputGroup>
                            </Field>

                            {/* button for export CSV */}
                            <Button variant="outline" size="icon" className={'w-fit flex gap-x-2 px-2 py-1'}>
                                <Download />
                                Export CSV
                            </Button>
                        </div>
                    </div>

                    {/* start filter */}
                    <div className="flex gap-x-4 items-center px-4 py-3 rounded-lg bg-white mt-4">
                        <span>Filter :</span>
                        <div className="flex flex-row gap-x-4 w-[30%]">
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
                                            <Button variant="link" className="px-0">
                                                Detail
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {/* end of table */}

                    <div className="px-4 py-3 flex justify-between bg-white rounded-b-lg text-sm">
                        <span>Halaman 1 dari 2 - total 12</span>

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

                        <Field orientation="horizontal" className="w-fit">
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
        </>
    )
}