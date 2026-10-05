import { SiteHeader } from "@/components/sidebar/site-header";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { formatRupiah, formatRupiahShort } from "@/lib/rupiah";
import { Download, Search } from "lucide-react";


// NOTE : KURANG SIDEBAR YANG UNTUK DETAIL NYA

export default function Arsip() {
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
        </>
    )
}