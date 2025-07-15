"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { TrendingUp, TreePine, BarChart3, PieChartIcon } from "lucide-react";

const yearlyData = [
    { year: "2015", value: 8500 },
    { year: "2016", value: 9200 },
    { year: "2017", value: 8800 },
    { year: "2018", value: 11200 },
    { year: "2019", value: 10800 },
    { year: "2020", value: 9800 },
    { year: "2021", value: 9500 },
    { year: "2022", value: 10200 },
    { year: "2023", value: 10800 },
    { year: "2024", value: 8200 },
];

const pieData = [
    { name: "Rừng trồng", value: 65, color: "#06D6A0" },
    { name: "Rừng tự nhiên", value: 35, color: "#118AB2" },
];

const horizontalData = [
    { category: "Thông", value: 4500, color: "#06D6A0" },
    { category: "Bạch đàn", value: 3200, color: "#118AB2" },
    { category: "Cao su", value: 2800, color: "#073B4C" },
    { category: "Keo", value: 2100, color: "#FFD166" },
];

const comparisonData = [
    { category: "Sản xuất", current: 8500, previous: 7200 },
    { category: "Khai thác", current: 6200, previous: 5800 },
];

export default function Dashboard() {
    return (
        <div className="min-h-screen p-6">
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        Dashboard Quản Lý Rừng
                    </h1>
                    <p className="text-gray-600">Thống kê và phân tích dữ liệu lâm nghiệp</p>
                </div>

                {/* Top Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
                        <CardContent className="relative p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <TreePine className="w-6 h-6" />
                                </div>
                                <TrendingUp className="w-5 h-5 opacity-70" />
                            </div>
                            <div className="text-3xl font-bold mb-2">1</div>
                            <div className="text-emerald-100 text-sm">Số lượng khu vực</div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600"></div>
                        <CardContent className="relative p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <TrendingUp className="w-5 h-5 opacity-70" />
                            </div>
                            <div className="text-3xl font-bold mb-2">10,528</div>
                            <div className="text-cyan-100 text-sm">Tổng sản lượng gỗ m³</div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                        <CardContent className="relative p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <PieChartIcon className="w-6 h-6" />
                                </div>
                                <TrendingUp className="w-5 h-5 opacity-70" />
                            </div>
                            <div className="text-3xl font-bold mb-2">132,734.54</div>
                            <div className="text-purple-100 text-sm">Tổng diện tích (ha)</div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500"></div>
                        <CardContent className="relative p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <TrendingUp className="w-5 h-5 opacity-70" />
                            </div>
                            <div className="text-3xl font-bold mb-2">0.08</div>
                            <div className="text-orange-100 text-sm">Sản lượng TB gỗ/Thửa</div>
                        </CardContent>
                    </Card>
                </div>
                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Bar Chart */}
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Thống kê sản lượng gỗ 10 năm
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart
                                    data={yearlyData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="barGradient"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop offset="0%" stopColor="#06D6A0" />
                                            <stop offset="100%" stopColor="#118AB2" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                                    <YAxis stroke="#64748b" fontSize={12} />
                                    <Bar
                                        dataKey="value"
                                        fill="url(#barGradient)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Pie Chart */}
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                Phân bố loại rừng
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={320}>
                                <PieChart>
                                    <defs>
                                        <linearGradient
                                            id="pieGradient1"
                                            x1="0"
                                            y1="0"
                                            x2="1"
                                            y2="1"
                                        >
                                            <stop offset="0%" stopColor="#06D6A0" />
                                            <stop offset="100%" stopColor="#04A777" />
                                        </linearGradient>
                                        <linearGradient
                                            id="pieGradient2"
                                            x1="0"
                                            y1="0"
                                            x2="1"
                                            y2="1"
                                        >
                                            <stop offset="0%" stopColor="#118AB2" />
                                            <stop offset="100%" stopColor="#0E7490" />
                                        </linearGradient>
                                    </defs>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={120}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        <Cell fill="url(#pieGradient1)" />
                                        <Cell fill="url(#pieGradient2)" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-6 mt-6">
                                {pieData.map((entry, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full shadow-sm"
                                            style={{ backgroundColor: entry.color }}
                                        />
                                        <div className="text-sm">
                                            <span className="font-medium text-gray-700">
                                                {entry.name}
                                            </span>
                                            <span className="text-gray-500 ml-2">
                                                {entry.value}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Horizontal Bar Chart */}
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Diện tích theo loại cây
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {horizontalData.map((item, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">
                                                {item.category}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-600">
                                                {item.value.toLocaleString()} ha
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3 shadow-inner">
                                            <div
                                                className="h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                                style={{
                                                    width: `${(item.value / Math.max(...horizontalData.map(d => d.value))) * 100}%`,
                                                    background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Comparison Chart */}
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                So sánh hoạt động lâm nghiệp
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart
                                    data={comparisonData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="currentGradient"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop offset="0%" stopColor="#06D6A0" />
                                            <stop offset="100%" stopColor="#04A777" />
                                        </linearGradient>
                                        <linearGradient
                                            id="previousGradient"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop offset="0%" stopColor="#118AB2" />
                                            <stop offset="100%" stopColor="#0E7490" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="category" stroke="#64748b" fontSize={12} />
                                    <YAxis stroke="#64748b" fontSize={12} />
                                    <Bar
                                        dataKey="current"
                                        fill="url(#currentGradient)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="previous"
                                        fill="url(#previousGradient)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-6 mt-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-sm" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Năm hiện tại
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Năm trước
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
