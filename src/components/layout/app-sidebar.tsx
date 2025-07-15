import * as React from "react";
import { ChevronRight } from "lucide-react";

import { SearchForm } from "@/components/layout/search-form";
import { VersionSwitcher } from "@/components/layout/version-switcher";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
    navMain: [
        {
            title: "Tổng quan",
            url: "/dashboard",
        },
        {
            title: "Bản đồ",
            url: "/map",
        },
        {
            title: "Thông tin cá nhân",
            url: "/profile",
        },
        {
            title: "Hồ sở chứng từ",
            url: "/documentation-records",
        },
        {
            title: "Danh sách lô rừng",
            url: "/forest-plot",
        },
        {
            title: "Tạo giao dịch mua",
            url: "/transaction/create",
        },
        {
            title: "Community",
            url: "#",
            items: [
                {
                    title: "Contribution Guide",
                    url: "#",
                    isActive: true,
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <VersionSwitcher />
                <SearchForm />
            </SidebarHeader>
            <SidebarContent className="gap-0">
                {data.navMain.map(item => (
                    <Collapsible
                        key={item.title}
                        title={item.title}
                        defaultOpen
                        className="group/collapsible"
                    >
                        <SidebarGroup className="py-0.5">
                            <SidebarGroupLabel
                                asChild
                                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                            >
                                <CollapsibleTrigger>
                                    {item.items && item.items.length > 0 && (
                                        <>
                                            {item.title}
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </>
                                    )}
                                    {!item.items && (
                                        <Link href={item.url} className="w-full text-left">
                                            {item.title}
                                        </Link>
                                    )}
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {item.items &&
                                            item.items.map(item => (
                                                <SidebarMenuItem key={item.title}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={item.isActive}
                                                    >
                                                        <a href={item.url}>{item.title}</a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
