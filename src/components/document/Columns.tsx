"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export type LandUse = {
    id: string;
    type: string;
    serialNumber: string;
    acreage: number;
    agency: string;
    duration: string;
};

export const columns: ColumnDef<LandUse>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "type",
        header: "Loại giấy tờ",
    },
    {
        accessorKey: "serialNumber",
        header: "Số hiệu",
    },
    {
        accessorKey: "acreage",
        header: "Diện tích (m²)",
        cell: info => <span>{Number(info.getValue()).toLocaleString("vi-VN")} (m²)</span>,
    },
    {
        accessorKey: "agency",
        header: "Cơ quan cấp",
    },
    {
        accessorKey: "duration",
        header: "Thời hạn sử dụng",
    },
    {
        accessorKey: "actions",
        header: "Hành động",
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Dialog>
                            <DialogTrigger className="text-sm hover:bg-gray-100 w-full py-1.5 text-left px-3 rounded-lg cursor-pointer">
                                Xem chi tiết
                            </DialogTrigger>
                            <DialogTrigger className="text-sm hover:bg-gray-100 w-full py-1.5 text-left px-3 rounded-lg cursor-pointer">
                                Chỉnh sửa
                            </DialogTrigger>
                            <DialogTrigger className="text-sm hover:bg-gray-100 w-full py-1.5 text-left px-3 rounded-lg cursor-pointer">
                                Xóa bỏ
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete
                                        your account and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
