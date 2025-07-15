import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ArrowLeft, Copy } from "lucide-react";
import { ForestPlot } from "./ForestManagement";

type DetailPlotProps = {
    selectedPlot: ForestPlot;
    onBack: () => void;
};

const DetailPlot = ({ onBack, selectedPlot }: DetailPlotProps) => {
    return (
        <div className="h-full flex flex-col">
            {/* Tabs */}
            <div className="flex-1 overflow-hidden">
                <Tabs defaultValue="info" className="h-full flex flex-col">
                    <div className="p-4 flex items-center justify-between border-b">
                        <Button variant="outline" onClick={onBack}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <TabsList className="grid w-fit grid-cols-2">
                            <TabsTrigger value="info">Thông tin</TabsTrigger>
                            <TabsTrigger value="progress">Tiến trình</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="info" className="flex-1 overflow-y-auto px-4 pb-4 mt-3">
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    1. Thông tin lô
                                </h3>
                                <div className="space-y-2 ml-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Mã lô:</span>
                                        <span className="text-sm font-medium">
                                            {selectedPlot.code}
                                        </span>
                                        <Button variant="ghost" size="sm">
                                            <Copy className="w-3 h-3 text-teal-600" />
                                        </Button>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-600">Địa chỉ:</span>
                                        <span className="ml-2 text-sm">
                                            {selectedPlot.location}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-600">Loại rừng:</span>
                                        <span className="ml-2 text-sm">
                                            {selectedPlot.landType}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-600">
                                            Diện tích (ha):
                                        </span>
                                        <span className="ml-2 text-sm font-medium">
                                            {selectedPlot.area.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Plant Species Info */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    2. Thông tin cây trồng
                                </h3>
                                <div className="grid grid-cols-2 gap-6 ml-4">
                                    <div>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-gray-600">
                                                    Tên loài:
                                                </span>
                                                <span className="ml-2 text-sm">
                                                    {selectedPlot.plantSpecies.local}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">
                                                    Tên Latin (Nếu có):
                                                </span>
                                                <span className="ml-2 text-sm">
                                                    {selectedPlot.plantSpecies.latin}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">
                                                    Mật độ:
                                                </span>
                                                <span className="ml-2 text-sm">
                                                    {selectedPlot.plantSpecies.density}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">
                                                    Chu kỳ kinh doanh (Năm):
                                                </span>
                                                <span className="ml-2 text-sm">
                                                    {selectedPlot.plantSpecies.businessCycle}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-gray-600">
                                                    Tên loài:
                                                </span>
                                                <span className="ml-2 text-sm">
                                                    {selectedPlot.additionalSpecies.local}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">
                                                    Tên Latin (Nếu có):
                                                </span>
                                                <span className="ml-2 text-sm">
                                                    {selectedPlot.additionalSpecies.latin}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">
                                                    Mật độ:
                                                </span>
                                                <span className="ml-2 text-sm">
                                                    {selectedPlot.additionalSpecies.density}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">
                                                    Chu kỳ kinh doanh (Năm):
                                                </span>
                                                <span className="ml-2 text-sm">
                                                    {selectedPlot.additionalSpecies.businessCycle}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Geographic Info */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    3. Chỉ dẫn địa lý
                                </h3>
                                <div className="ml-4">
                                    <div>
                                        <span className="text-sm text-gray-600">
                                            Tọa độ tâm vườn:
                                        </span>
                                        <span className="ml-2 text-sm font-mono">
                                            {selectedPlot.coordinates}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    4. Hồ sơ kèm theo
                                </h3>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500">
                                        Chưa có hồ sơ nào được đính kèm
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="progress" className="flex-1 overflow-y-auto px-4 pb-4 mt-0">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Tiến trình xử lý</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div>
                                        <p className="text-sm font-medium">Hoàn thành khảo sát</p>
                                        <p className="text-xs text-gray-600">15/03/2024 - 09:30</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <p className="text-sm font-medium">Đang xử lý hồ sơ</p>
                                        <p className="text-xs text-gray-600">10/03/2024 - 14:20</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                    <div>
                                        <p className="text-sm font-medium">Tiếp nhận hồ sơ</p>
                                        <p className="text-xs text-gray-600">05/03/2024 - 08:15</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default DetailPlot;
