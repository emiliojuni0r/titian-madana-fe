import { useEffect, useState } from "react";
import { useSearchParams } from "react-router"; // <-- Import ini

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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { Download, Search, X } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { formatRupiah } from "@/lib/rupiah";
import tenderService from "./tenderService"; // <-- Sesuaikan path import API service-mu
import { Spinner } from "@/components/ui/spinner";

export default function Tender() {
    // 1. Inisialisasi Search Params dari URL
    const [searchParams, setSearchParams] = useSearchParams();

    const currentYear = new Date().getFullYear();

    // Mengambil nilai dari URL, berikan nilai default jika kosong
    const page = parseInt(searchParams.get("page")) || 1;
    const size = parseInt(searchParams.get("size")) || 10;
    const q = searchParams.get("q") || "";
    const jenis_pengadaan = searchParams.get("jenis_pengadaan") || "";
    const tahun = searchParams.get("tahun") || "";
    const jenis_paket = searchParams.get("jenis_paket") || "";
    const statusVal = searchParams.get("status") || "";

    // 2. Local States untuk Data dan UI
    const [tenders, setTenders] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingById, setLoadingByID] = useState(false);

    // State lokal untuk input search (agar tidak fetch per huruf saat mengetik)
    const [searchInput, setSearchInput] = useState(q);

    // State Sidebar Detail
    const [isDetailOpened, setIsDetailOpened] = useState(false);
    const [detailDeskripsi, setDetailDeskripsi] = useState("ringkasan");

    const [selectedTender, setSelectedTender] = useState(null);
    const [selectedTenderId, setSelectedTenderId] = useState(null);

    // 3. Fungsi Fetch API
    useEffect(() => {
        const fetchTenders = async () => {
            setLoading(true);
            try {
                // Menyiapkan parameter sesuai dokumentasi API
                const params = {
                    page: page,
                    size: size,
                };
                if (q) params.q = q;
                if (jenis_pengadaan) params.jenis_pengadaan = jenis_pengadaan;
                if (jenis_paket) params.jenis_paket = jenis_paket;
                if (tahun) params.tahun = tahun;
                if (statusVal) params.status = statusVal;

                const response = await tenderService.get(params);
                // Sesuaikan 'response.data.items' jika struktur axios API mu berbeda
                setTenders(response.data.items || []);
                setTotalItems(response.data.total || 0);
            } catch (error) {
                console.error("Gagal mengambil data tender:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTenders();
    }, [page, size, q, jenis_pengadaan, statusVal, jenis_paket, tahun]); // Fetch ulang HANYA jika parameter ini berubah

    useEffect(() => {
        console.log('selected id: ', selectedTenderId)
        const fetchTendersByID = async () => {
            setLoadingByID(true);
            try {
                const response = await tenderService.getById(selectedTenderId);

                if (response.status === 200) {
                    console.log('success get by id')
                    setSelectedTender(response.data || null)
                    console.log('ini response by id', response)
                    console.log('ini yg di variable by id', selectedTender)
                }
            } catch (error) {
                console.error("gagal mengembil data tender by ID:", error)
            } finally {
                setLoadingByID(false)
            }
        }

        fetchTendersByID();
    }, [selectedTenderId])

    // 4. Handler untuk mengubah URL Parameters (yang akan memicu useEffect otomatis)
    const updateURLParams = (key, value, resetPage = true) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key); // Hapus param jika kosong
        }

        if (resetPage) {
            newParams.set("page", "1"); // Kembalikan ke halaman 1 setiap ganti filter/search
        }

        setSearchParams(newParams);
    };

    // Handler ketika menekan 'Enter' di input pencarian
    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            updateURLParams("q", searchInput);
        }
    };

    const totalPages = Math.ceil(totalItems / size);

    return (
        <>
            <SiteHeader breadcrumbs={[{ label: "Tender" }, { label: "Daftar tender" }]} />
            <div className="px-3 py-2.5 min-h-screen">
                <div className="rounded-lg bg-stone-100 h-full px-3 py-4">

                    {/* Header Action */}
                    <div className="flex flex-col md:justify-between">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-lg md:text-2xl font-bold">Daftar Tender</h1>
                            <Button variant="outline" size="icon" className={'w-fit md:hidden flex gap-x-2 px-2 py-1 text-xs md:text-sm ml-auto md:ml-0'}>
                                <Download /> Export CSV
                            </Button>
                        </div>
                        <div className="flex flex-col-reverse md:flex-row gap-2 mt-2 md:mt-0">
                            {/* Input Search */}
                            <Field className={'md:ml-auto md:w-1/4'}>
                                <InputGroup>
                                    <InputGroupAddon align="inline-start">
                                        <Search className="cursor-pointer" onClick={() => updateURLParams("q", searchInput)} />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        placeholder="Cari judul tender..."
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        onKeyDown={handleSearchKeyDown} // Trigger search saat Enter
                                    />
                                </InputGroup>
                            </Field>
                            <Button variant="outline" size="icon" className={'w-fit hidden md:flex gap-x-2 px-2 py-1 text-xs md:text-sm ml-auto md:ml-0'}>
                                <Download /> Export CSV
                            </Button>
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="flex flex-col md:flex-row gap-x-4 md:items-center px-2 py-1.5 md:px-4 md:py-3 rounded-lg bg-white mt-2 md:mt-4">
                        <span>Filter :</span>
                        <div className="flex flex-col md:flex-row gap-x-4 gap-y-1 md:w-[30%]">
                            <Field>
                                <NativeSelect
                                    value={jenis_pengadaan}
                                    onChange={(e) => updateURLParams("jenis_pengadaan", e.target.value)}
                                >
                                    <NativeSelectOption value="">Semua Kategori</NativeSelectOption>
                                    <NativeSelectOption value="Jasa Lainnya">Jasa Lainnya</NativeSelectOption>
                                    <NativeSelectOption value="Pengadaan Barang">Pengadaan Barang</NativeSelectOption>
                                    <NativeSelectOption value="Pekerjaan Konstruksi">Pekerjaan Konstruksi</NativeSelectOption>
                                    <NativeSelectOption value="Jasa Konsultansi">Jasa Konsultansi</NativeSelectOption>
                                </NativeSelect>
                            </Field>
                            <Field>
                                <NativeSelect
                                    value={statusVal}
                                    onChange={(e) => updateURLParams("status", e.target.value)}
                                >
                                    <NativeSelectOption value="">Semua Status</NativeSelectOption>
                                    <NativeSelectOption value="Upload Dokumen Penawaran">Upload Dokumen</NativeSelectOption>
                                    <NativeSelectOption value="Penandatanganan Kontrak">Penandatanganan Kontrak</NativeSelectOption>
                                    <NativeSelectOption value="Selesai">Selesai</NativeSelectOption>
                                    <NativeSelectOption value="Evaluasi Penawaran">Evaluasi Penawaran</NativeSelectOption>
                                    <NativeSelectOption value="Tidak Ada Jadwal">Tidak Ada Jadwal</NativeSelectOption>
                                </NativeSelect>
                            </Field>
                            <Field>
                                <NativeSelect
                                    value={jenis_paket}
                                    onChange={(e) => updateURLParams("jenis_paket", e.target.value)}
                                >
                                    <NativeSelectOption value="">Semua Jenis Paket</NativeSelectOption>
                                    <NativeSelectOption value="tender">tender</NativeSelectOption>
                                    <NativeSelectOption value="nontender">nontender</NativeSelectOption>
                                </NativeSelect>
                            </Field>
                            <Field>
                                <NativeSelect
                                    value={tahun}
                                    onChange={(e) => updateURLParams("tahun", e.target.value)}
                                >
                                    <NativeSelectOption value="">tahun</NativeSelectOption>
                                    <NativeSelectOption value={currentYear}>{currentYear}</NativeSelectOption>
                                    <NativeSelectOption value={currentYear - 1}>{currentYear - 1}</NativeSelectOption>
                                    <NativeSelectOption value={currentYear - 2}>{currentYear - 2}</NativeSelectOption>
                                    <NativeSelectOption value={currentYear - 3}>{currentYear - 3}</NativeSelectOption>
                                    <NativeSelectOption value={currentYear - 4}>{currentYear - 4}</NativeSelectOption>
                                    <NativeSelectOption value={currentYear - 5}>{currentYear - 5}</NativeSelectOption>
                                </NativeSelect>
                            </Field>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex gap-x-4 items-center px-4 py-3 rounded-lg bg-white mt-4">
                        <Table className={'overflow-x-auto relative'}>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="md:min-w-[400px]">Nama Tender</TableHead>
                                    <TableHead>Jenis Pengadaan</TableHead>
                                    <TableHead>Jenis Paket</TableHead>
                                    <TableHead>Instansi</TableHead>
                                    <TableHead>Sumber Dana</TableHead>
                                    <TableHead>Nilai Pagu</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-10">Loading data...</TableCell>
                                    </TableRow>
                                ) : tenders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-10">Data tidak ditemukan</TableCell>
                                    </TableRow>
                                ) : (
                                    tenders.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium max-w-[250px] truncate" title={item.judul}>
                                                {item.judul}
                                            </TableCell>
                                            <TableCell>{item.jenis_pengadaan || "-"}</TableCell>
                                            <TableCell>{item.jenis_paket || "-"}</TableCell>
                                            <TableCell className="max-w-[150px] truncate" title={item.instansi}>
                                                {item.instansi || "-"}
                                            </TableCell>
                                            <TableCell>{item.sumber_dana || "-"}</TableCell>
                                            <TableCell>{item.nilai_pagu ? formatRupiah(item.nilai_pagu) : "-"}</TableCell>
                                            <TableCell>{item.status_tahap || "-"}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="link"
                                                    className="px-0 cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedTenderId(item.id);
                                                        setIsDetailOpened(true);
                                                    }}
                                                >
                                                    Detail
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3 flex flex-col md:flex-row justify-center gap-y-3 md:justify-between bg-white rounded-b-lg text-sm items-center">
                        <span className="mx-auto md:mx-0">
                            Menampilkan {(page - 1) * size + 1} - {Math.min(page * size, totalItems)} dari total {totalItems}
                        </span>

                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (page > 1) updateURLParams("page", (page - 1).toString(), false);
                                        }}
                                        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>

                                <PaginationItem>
                                    <span className="px-4 py-2 border rounded-md font-medium text-sm">
                                        Hal {page} / {totalPages || 1}
                                    </span>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (page < totalPages) updateURLParams("page", (page + 1).toString(), false);
                                        }}
                                        className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>

                        <Field orientation="horizontal" className="w-fit mx-auto md:mx-0">
                            <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
                            <Select
                                value={size.toString()}
                                onValueChange={(val) => updateURLParams("size", val)}
                            >
                                <SelectTrigger className="w-20" id="select-rows-per-page">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent align="start">
                                    <SelectGroup>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
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
                        onClick={() => setIsDetailOpened(false)} />

                    {/* sidebar */}
                    <div
                        className={`w-full lg:w-4/12 overflow-y-auto h-full border-l bg-white px-6 py-4 transition-transform duration-1000 delay-300 ease-in-out ${isDetailOpened ? "translate-x-0" : "translate-x-full"} `} >
                        {loadingById ?
                            // if loading
                            <>
                                <div className="w-full h-full flex flex-col justify-center items-center">
                                    <Spinner className={'scale-150'} />
                                </div>
                            </> :
                            // if not loading
                            <>

                                <div className="justify-between flex items-center">
                                    <span className="flex gap-x-2">
                                        {/* id */}
                                        <span className="bg-gray-300 text-xs rounded-md p-1">
                                            {selectedTender?.kode_rup || '-'}
                                        </span>
                                        {/* status */}
                                        <span className="bg-gray-300 outline outline-gray-400 text-gray-800 text-xs rounded-md p-1">
                                            {selectedTender?.status_tahap || '-'}
                                        </span>
                                    </span>
                                    <X className="cursor-pointer hover:bg-gray-50" onClick={() => setIsDetailOpened(false)} />
                                </div>
                                <div className="mt-4">
                                    {/* judul */}
                                    <h2>
                                        {selectedTender?.judul || '-'}
                                    </h2>
                                    {/*  */}
                                    <h3 className="text-xs text-gray-500">{selectedTender?.instansi || 'instansi tidak diketahui'}</h3>
                                </div>

                                {/* progress */}
                                {/* <div className="mt-4">
                                    <span className="flex justify-between">
                                        <span className="text-xs">Progress Pelaksanaan</span>
                                        <span className="text-sm">80%</span>
                                    </span>
                                    <div className="rounded-lg h-2 w-full bg-gray-400 overflow-clip">
                                        <div className="w-[80%] h-full bg-blue-400">

                                        </div>
                                    </div>
                                </div> */}

                                <div className="mt-4 flex gap-x-2 overflow-x-auto">
                                    <Button variant="outline" size="icon" className={`w-fit flex gap-x-2 px-4 py-2 ${detailDeskripsi === 'ringkasan' ? 'bg-blue-500 text-white' : ''}`} onClick={() => setDetailDeskripsi("ringkasan")}>
                                        Ringkasan
                                    </Button>
                                    <Button variant="outline" size="icon" className={`w-fit flex gap-x-2 px-4 py-2 ${detailDeskripsi === 'pemenang' ? 'bg-blue-500 text-white' : ''}`} onClick={() => setDetailDeskripsi("pemenang")}>
                                        Pemenang {`(${selectedTender.pemenang.length})`}
                                    </Button>
                                    <Button variant="outline" size="icon" className={`w-fit flex gap-x-2 px-4 py-2 ${detailDeskripsi === 'sppj' ? 'bg-blue-500 text-white' : ''}`} onClick={() => setDetailDeskripsi("sppj")}>
                                        SPPJ {`(${selectedTender.sppj.length})`}
                                    </Button>
                                </div>

                                <div className="border-b inset-0 my-4" />

                                {
                                    detailDeskripsi === "ringkasan" &&
                                    <div className="py-4 overflow-y-auto min-w-0 max-w-full overflow-x-hidden">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 px-0.5">
                                            {/* nilai kontrak */}
                                            <div className="rounded-lg flex flex-col gap-y-0.5 px-4 py-3 md:py-6 bg-gray-100 outline">
                                                {/* <span className="text-xs">Nilai Kontrak</span> */}
                                                {/* <span>{formatRupiah(2340000000)}</span> */}
                                                <span className="text-xs">Nilai Pagu</span>
                                                <span>{formatRupiah(selectedTender?.nilai_pagu || 0)}</span>
                                            </div>
                                            {/*  */}
                                            <div className="rounded-lg flex flex-col gap-y-0.5 px-4 py-3 md:py-6 bg-gray-100 outline">
                                                {/* <span className="text-xs">Masa Berlaku</span>
                                                <span>2024-11-05 – 2025-05-05</span> */}
                                                <span className="text-xs">Nilai HPS</span>
                                                <span>{(formatRupiah(selectedTender?.nilai_hps)) || '-'}</span>
                                            </div>
                                        </div>

                                        {/* deskripsi proyek */}
                                        {/* <div className="mt-4">
                                            <span className="text-gray-600 text-sm">Deskripsi Proyek</span>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora et quisquam ullam eum cupiditate ipsa dignissimos cumque, possimus vero nostrum dicta recusandae esse eos quibusdam blanditiis autem fuga, consequuntur alias!</p>
                                        </div> */}

                                        {/* deskripsi proyek */}
                                        <div className="mt-4 max-w-full">
                                            <span className="text-gray-600 text-sm">Informasi Umum</span>
                                            <Table className={'table-fixed'}>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell className="w-[190px] font-medium text-gray-700">tahun</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.tahun_anggaran || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="text-xs font-medium whitespace-normal break-all text-gray-700">Tanggal mulai Pengumuman</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.tgl_mulai_pengumuman || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="text-xs font-medium whitespace-normal break-all text-gray-700">Tanggal selesai Pengumuman</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.tgl_selesai_pengumuman || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="text-xs font-medium whitespace-normal break-all text-gray-700">Tanggal mulai Sanggah</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.tgl_mulai_sanggah || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="text-xs font-medium whitespace-normal break-all text-gray-700">Tanggal selesai Sanggah</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.tgl_selesai_sanggah || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium text-gray-700">Jenis Pengadaan</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.jenis_pengadaan || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium text-gray-700">Jenis Paket</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.jenis_paket || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium text-gray-700">Metode Pemilihan</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.metode_pemilihan || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium text-gray-700">Metode Evaluasi</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.metode_evaluasi || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium text-gray-700">Kualifikasi</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.kualifikasi || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium text-gray-700">Jenis Kontrak</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.jenis_kontrak || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium text-gray-700">Sumber Dana</TableCell>
                                                        <TableCell className="text-left text-left whitespace-normal break-all">{selectedTender?.sumber_dana || '-'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium text-gray-700">Lokasi</TableCell>
                                                        <TableCell className="text-left whitespace-normal break-all">{selectedTender?.lokasi || '-'}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>


                                        {/* Kontak PIC */}
                                        {/* <div className="mt-4 px-0.5">
                                            <span className="text-gray-600 text-sm">Kontak PIC</span>
                                            <div className="outline rounded-md mt-1 px-4 py-6">
                                                <p className="text-lg">Sari Dewi, S.si</p>
                                                <p className="text-sm">sari.dewi@bpom.go.id</p>
                                                <p className="text-sm">+62 21 4244 691</p>
                                            </div>
                                        </div> */}

                                        {/* Perusahaan Pemenang */}
                                        {/* <div className="mt-4 px-0.5">
                                            <span className="text-gray-600 text-sm">Perusahaan Pemenang</span>
                                            <div className="outline rounded-md mt-1 px-4 py-6">
                                                <p className="text-lg">CV Labortech Indonesia</p>
                                                <p className="text-sm"><span className="text-gray-500">Alamat:</span> Jl. Raya Pasar Minggu No. 56, Jakarta Selatan</p>
                                                <p className="text-sm"><span className="text-gray-500">NPWP:</span> 72.345.678.9-012.000</p>
                                            </div>
                                        </div> */}
                                    </div>
                                }

                                {
                                    detailDeskripsi === "pemenang" &&
                                    <div className="mt-4">
                                        <span className="text-gray-600 text-sm">
                                            Perusahaan Pemenang
                                        </span>

                                        {selectedTender?.pemenang?.length > 0 ? (
                                            selectedTender.pemenang.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="outline rounded-md mt-2 px-4 py-4"
                                                >
                                                    <p className="text-lg font-medium">
                                                        {item.nama_penyedia}
                                                    </p>

                                                    <p className="text-sm mt-2">
                                                        <span className="text-gray-500">Alamat:</span>{" "}
                                                        {item.alamat || "-"}
                                                    </p>

                                                    <p className="text-sm">
                                                        <span className="text-gray-500">NPWP:</span>{" "}
                                                        {item.npwp || "-"}
                                                    </p>

                                                    <div className="border-b my-3" />

                                                    <p className="text-sm">
                                                        Harga Penawaran:{" "}
                                                        {formatRupiah(item.harga_penawaran || 0)}
                                                    </p>

                                                    <p className="text-sm">
                                                        Harga Terkoreksi:{" "}
                                                        {formatRupiah(item.harga_terkoreksi || 0)}
                                                    </p>

                                                    <p className="text-sm">
                                                        Harga Negosiasi:{" "}
                                                        {item.harga_negosiasi
                                                            ? formatRupiah(item.harga_negosiasi)
                                                            : "-"}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500 mt-2">
                                                Belum ada informasi pemenang.
                                            </p>
                                        )}
                                    </div>
                                }

                                {
                                    detailDeskripsi === "sppj" &&
                                    <div className="mt-4">
                                        <span className="text-gray-600 text-sm">
                                            Informasi Kontrak (SPPJ)
                                        </span>

                                        {selectedTender?.sppj?.length > 0 ? (
                                            selectedTender.sppj.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="outline rounded-md mt-2 px-4 py-4"
                                                >
                                                    <p className="font-medium text-lg">
                                                        {item.nama_penyedia}
                                                    </p>

                                                    <p className="text-sm mt-2">
                                                        {item.alamat || "-"}
                                                    </p>

                                                    <div className="border-b my-3" />

                                                    <p className="text-sm">
                                                        Nilai Kontrak:{" "}
                                                        {formatRupiah(item.nilai_kontrak || 0)}
                                                    </p>

                                                    <p className="text-sm">
                                                        Nilai PDN:{" "}
                                                        {formatRupiah(item.nilai_pdn || 0)}
                                                    </p>

                                                    <p className="text-sm">
                                                        Nilai UMK:{" "}
                                                        {formatRupiah(item.nilai_umk || 0)}
                                                    </p>

                                                    <p className="text-sm">
                                                        Status Kontrak: {item.status_kontrak || "-"}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500 mt-2">
                                                Belum ada informasi kontrak.
                                            </p>
                                        )}
                                    </div>
                                }

                            </>}
                    </div>
                </div>
            </>
            }
            {/* end of details (right sidebar) */}

        </>
    )
}