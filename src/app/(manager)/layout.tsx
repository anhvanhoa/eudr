import { AppSidebar } from "@/components/layout/app-sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QrCode } from "lucide-react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="bg-background sticky top-0 flex h-16 shrink-0 gap-2 border-b px-4 justify-between items-center z-40">
                    <div className="flex items-center h-full gap-x-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                    </div>
                    <div>
                        <Popover>
                            <PopoverTrigger className="bg-gray-100 p-2 rounded-2xl">
                                <QrCode />
                            </PopoverTrigger>
                            <PopoverContent className="p-0 mt-2" align="end">
                                <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center shadow-inner">
                                    <div className="grid grid-cols-8 gap-px p-2">
                                        {Array.from({ length: 64 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-2 h-2 rounded-sm ${Math.random() > 0.5 ? "bg-white" : "bg-gray-800"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Layout;
