import * as React from "react"
import {
    Activity,
    Archive,
    BookOpen,
    Bot,
    ChartSpline,
    Command,
    Frame,
    LayoutDashboard,
    LifeBuoy,
    List,
    Map,
    PieChart,
    Search,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react"


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
// import { NavProjects } from "./nav-projects"
// import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { NavLink } from "react-router"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },

}

export function AppSidebar({ ...props }) {
    return (
        <Sidebar
            className="h-full! z-50"
            {...props}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="xl" asChild>
                            <a href="#" className="flex flex-row gap-x-2">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Title</span>
                                    <span className="truncate text-xs">subtitle</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* <NavMain items={data.navMain} /> */}
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
                <SidebarGroup className={'gap-y-2'}>
                    {/* Dashboard */}
                    <SidebarMenu>
                        <SidebarMenuItem className={``}>
                            <SidebarMenuButton
                                render={({ className, ...props }) => (
                                    <NavLink
                                        {...props}
                                        to="/"
                                        className={({ isActive }) =>
                                            `${className} ${isActive ? "border-l-4 rounded-l-md bg-sidebar-accent text-sidebar-accent-foreground" : ""}`
                                        }
                                    />
                                )}
                            >
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    {/* Tender */}
                    <SidebarMenu>
                        <SidebarMenuItem className={''}>
                            <SidebarMenuButton
                                render={({ className, ...props }) => (
                                    <NavLink
                                        {...props}
                                        to="/tender"
                                        className={({ isActive }) =>
                                            `${className} ${isActive ? "border-l-4 rounded-l-md bg-sidebar-accent text-sidebar-accent-foreground" : ""}`
                                        }
                                    />
                                )}
                            >
                                <List />
                                {/* <project.icon /> */}
                                <span>Tender</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    {/* Arsip */}
                    <SidebarMenu>
                        <SidebarMenuItem className={''}>
                            <SidebarMenuButton
                                render={({ className, ...props }) => (
                                    <NavLink
                                        {...props}
                                        to="/arsip"
                                        className={({ isActive }) =>
                                            `${className} ${isActive ? "border-l-4 rounded-l-md bg-sidebar-accent text-sidebar-accent-foreground" : ""}`
                                        }
                                    />
                                )}
                            >
                                <Archive />
                                {/* <project.icon /> */}
                                <span>Arsip</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    {/* Monitoring */}
                    <SidebarMenu>
                        <SidebarMenuItem className={''}>
                            <SidebarMenuButton
                                render={({ className, ...props }) => (
                                    <NavLink
                                        {...props}
                                        to="/monitoring"
                                        className={({ isActive }) =>
                                            `${className} ${isActive ? "border-l-4 rounded-l-md bg-sidebar-accent text-sidebar-accent-foreground" : ""}`
                                        }
                                    />
                                )}
                            >
                                <Activity />
                                <span>Monitoring</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    {/* Scraping */}
                    <SidebarMenu>
                        <SidebarMenuItem className={''}>
                            <SidebarMenuButton render={<a href={''} />}>
                                <Search />
                                {/* <project.icon /> */}
                                <span>Scraping</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>


                    {/* Analitik */}
                    <SidebarMenu>
                        <SidebarMenuItem className={''}>
                            <SidebarMenuButton
                                render={({ className, ...props }) => (
                                    <NavLink
                                        {...props}
                                        to="/analitik"
                                        className={({ isActive }) =>
                                            `${className} ${isActive ? "border-l-4 rounded-l-md bg-sidebar-accent text-sidebar-accent-foreground" : ""}`
                                        }
                                    />
                                )}
                            >
                                <ChartSpline />
                                {/* <project.icon /> */}
                                <span>Analitik</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    {/* Arsip */}
                    <SidebarMenu>
                        <SidebarMenuItem className={''}>
                            <SidebarMenuButton render={<a href={'/dashboard'} />}>
                                <LayoutDashboard />
                                {/* <project.icon /> */}
                                <span>menu6</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>


                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
