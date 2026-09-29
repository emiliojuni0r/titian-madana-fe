import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SiteHeader } from "@/components/sidebar/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { CalendarDays, ClipboardCheck, ClipboardList, TriangleAlert } from "lucide-react"


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
                    <h1 className="text-2xl">Selamat Datang Kembali, nama_user</h1>
                    <div className="flex flex-row gap-x-2 items-center">
                        <CalendarDays className="scale-75" />
                        <span className="text-sm">Selasa, 29 September 2026</span>
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
                    </div>
                    {/* end of 4 grid */}
                </div>
            </div>
        </>
    )
}
