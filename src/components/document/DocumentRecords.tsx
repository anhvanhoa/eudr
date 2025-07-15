"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { columns, LandUse } from "./Columns";
import { TableDocument } from "./TableDocument";
import { Award, FileText } from "lucide-react";

const data: LandUse[] = [
    {
        id: "728ed52f",
        acreage: 1000,
        agency: "Sở Tài nguyên và Môi trường",
        duration: "12/12/2028",
        serialNumber: "SN123456",
        type: "Giấy chứng nhận quyền sử dụng đất",
    },
];

export default function DocumentRecords() {
    return (
        <div>
            <Tabs defaultValue="account">
                <div className="space-y-6">
                    {/* Main Content */}
                    <Card className="shadow-none bg-white/80 backdrop-blur-sm p-0 gap-0">
                        <CardHeader className="border-b border-slate-200/60 !p-4 gap-0">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-bold text-slate-800">
                                        Hồ sơ, chứng từ
                                    </h1>
                                </div>
                                <div className="flex gap-1 p-1 bg-slate-200/50 rounded-lg">
                                    <TabsList>
                                        <TabsTrigger
                                            value="account"
                                            className="flex items-center px-3"
                                        >
                                            <Award className="size-4" />
                                            <span>Chứng chỉ</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="password"
                                            className="flex items-center px-3"
                                        >
                                            <FileText className="size-4" />
                                            <span>Chứng chỉ</span>
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <TabsContent value="account" className="mb-4">
                                <div className="overflow-x-auto">
                                    <TableDocument columns={columns} data={data} />
                                </div>
                            </TabsContent>
                            <TabsContent value="password" className="mb-4">
                                <div className="overflow-x-auto">
                                    <TableDocument columns={columns} data={data} />
                                </div>
                            </TabsContent>
                        </CardContent>
                    </Card>
                </div>
            </Tabs>
        </div>
    );
}
