import React from "react";
import { ForestPlot } from "./ForestManagement";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Copy, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

interface ForestPlotProps {
    data: ForestPlot[];
    onPlotSelect: (plot: ForestPlot) => void;
}

const ListPlot = ({ data, onPlotSelect }: ForestPlotProps) => {
    return (
        <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="space-y-4">
                {data.map(plot => (
                    <Card
                        key={plot.id}
                        className="cursor-pointer hover:shadow-md transition-shadow p-0 overflow-hidden"
                        onClick={() => onPlotSelect(plot)}
                    >
                        <CardHeader className="!py-3 px-4 gap-0 border-b">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-600">
                                        Mã lô:
                                    </span>
                                    <span className="font-semibold">{plot.code}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm">
                                        <Copy className="w-4 h-4 text-teal-600" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Trash2 className="w-4 h-4 text-gray-400" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2 pb-6">
                            <div>
                                <span className="text-sm text-gray-600">Địa chỉ:</span>
                                <span className="ml-2 text-sm">{plot.location}</span>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">Diện tích (ha):</span>
                                <span className="ml-2 text-sm font-medium">
                                    {plot.area.toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">Loại đất:</span>
                                <span className="ml-2 text-sm">{plot.landType}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Trạng thái:</span>
                                <Badge className={plot.statusColor}>{plot.status}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ListPlot;
