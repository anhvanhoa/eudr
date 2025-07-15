"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import ListPlot from "./ListPlot";
import DetailPlot from "./DetailPlot";
import Link from "next/link";
const ArcGISMap = dynamic(() => import("./ArcGISMap"), { ssr: false });

export interface ForestPlot {
    id: string;
    code: string;
    location: string;
    area: number;
    landType: string;
    status: string;
    statusColor: string;
    coordinates: string;
    longitude: number;
    latitude: number;
    boundary: number[][];
    plantSpecies: {
        local: string;
        latin: string;
        density: string;
        businessCycle: string;
    };
    additionalSpecies: {
        local: string;
        latin: string;
        density: string;
        businessCycle: string;
    };
}

export const mockData: ForestPlot[] = [
    {
        id: "1",
        code: "SZ7RZBO8JMQG",
        location: "Tỉnh Cà Mau - Phường 4",
        area: 132734.5402,
        landType: "DTTS",
        status: "Khai thác 1 phần",
        statusColor: "bg-orange-100 text-orange-800",
        coordinates: "X-Y: 122.01521212-31.50271414",
        longitude: 105.1521,
        latitude: 9.1827,
        boundary: [
            [105.15, 9.18],
            [105.155, 9.18],
            [105.155, 9.185],
            [105.15, 9.185],
            [105.15, 9.18],
        ],
        plantSpecies: {
            local: "Bần chua",
            latin: "Sonneratia Caseolaris (L.) Engl",
            density: "null",
            businessCycle: "null",
        },
        additionalSpecies: {
            local: "Tràm lá dài",
            latin: "Melaleuca leucadendra L",
            density: "null",
            businessCycle: "null",
        },
    },
    {
        id: "2",
        code: "AB3CDEF9GHIJ",
        location: "Tỉnh An Giang - Huyện Châu Phú",
        area: 85432.1234,
        landType: "DTTS",
        status: "Nguy cơ mất rừng - Thấp",
        statusColor: "bg-green-100 text-green-800",
        longitude: 105.1234,
        latitude: 10.9876,
        boundary: [
            [105.12, 10.985],
            [105.128, 10.985],
            [105.128, 10.99],
            [105.12, 10.99],
            [105.12, 10.985],
        ],
        coordinates: "X-Y: 105.12345678-10.98765432",
        plantSpecies: {
            local: "Tràm",
            latin: "Melaleuca cajuputi",
            density: "1200 cây/ha",
            businessCycle: "15 năm",
        },
        additionalSpecies: {
            local: "Mắm",
            latin: "Avicennia marina",
            density: "800 cây/ha",
            businessCycle: "20 năm",
        },
    },
    {
        id: "3",
        code: "KL5MNOP7QRST",
        location: "Tỉnh Kiên Giang - Huyện U Minh Thượng",
        area: 67890.9876,
        landType: "DTTS",
        status: "Bình thường",
        statusColor: "bg-blue-100 text-blue-800",
        longitude: 105.0876,
        latitude: 9.1234,
        boundary: [
            [105.085, 9.12],
            [105.09, 9.12],
            [105.09, 9.127],
            [105.085, 9.127],
            [105.085, 9.12],
        ],
        coordinates: "X-Y: 104.87654321-9.12345678",
        plantSpecies: {
            local: "Đước",
            latin: "Rhizophora apiculata",
            density: "1500 cây/ha",
            businessCycle: "25 năm",
        },
        additionalSpecies: {
            local: "Vẹt",
            latin: "Kandelia candel",
            density: "600 cây/ha",
            businessCycle: "18 năm",
        },
    },
];

export default function ForestManagement() {
    const [selectedPlot, setSelectedPlot] = useState<ForestPlot | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPlots = mockData.filter(
        plot =>
            plot.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plot.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalArea = mockData.reduce((sum, plot) => sum + plot.area, 0);

    const handlePlotSelect = (plot: ForestPlot) => {
        setSelectedPlot(plot);
    };

    const handleBack = () => {
        setSelectedPlot(null);
    };

    return (
        <div className="flex bg-gray-50 h-[calc(100vh-64px)] overflow-hidden">
            {/* Left Panel */}
            <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    {!selectedPlot && (
                        <div className="h-full flex flex-col">
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <div>
                                    <h1 className="text-lg font-semibold text-gray-800">
                                        Danh sách lô rừng
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Tổng:{" "}
                                        <span className="font-medium">
                                            {mockData.length} lô rừng
                                        </span>{" "}
                                        - Diện tích:{" "}
                                        <span className="font-medium">
                                            {totalArea.toLocaleString()} ha
                                        </span>
                                    </p>
                                </div>
                                <Link href="/forest-plot/create">
                                    <Button size="sm">Thêm mới</Button>
                                </Link>
                            </div>
                            <div className="p-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Tìm kiếm"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <ListPlot data={filteredPlots} onPlotSelect={handlePlotSelect} />
                        </div>
                    )}
                    {selectedPlot && <DetailPlot selectedPlot={selectedPlot} onBack={handleBack} />}
                </div>
            </div>

            {/* Right Panel - ArcGIS Map */}
            <ArcGISMap selectedPlot={selectedPlot} onPlotSelect={handlePlotSelect} />
        </div>
    );
}
