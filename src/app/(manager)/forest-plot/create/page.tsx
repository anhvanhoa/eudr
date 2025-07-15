"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import dynamic from "next/dynamic";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const LazyEsriMap = dynamic(() => import("@/components/create-plot/Map"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full items-center justify-center bg-gray-200 text-muted-foreground">
            Đang tải bản đồ...
        </div>
    ),
});

const types = [
    { value: "file-upload", label: "Tải File", description: "Tải lên file GeoJSON, KML, v.v." },
    {
        value: "coordinate-input",
        label: "Nhập Tọa Độ",
        description: "Nhập danh sách tọa độ thủ công",
    },
    {
        value: "draw-on-map",
        label: "Vẽ Trên Bản Đồ",
        description: "Vẽ đa giác trực tiếp trên bản đồ",
    },
];

export default function GeoInputPage() {
    const [selectedType, setSelectedType] = useState<string | undefined>();

    const handleEsriPolygonDraw = useCallback((coordinates: number[][][] | number[][][][]) => {
        console.log("Đa giác đã vẽ:", coordinates);
    }, []);

    const handleChangeSelection = () => {
        setSelectedType(undefined);
    };

    const typeSelection = useMemo(() => {
        return types.find(type => type.value === selectedType);
    }, [selectedType]);

    return (
        <div className="flex h-[calc(100vh-64px)] justify-center p-8">
            {!selectedType && (
                <Card className="w-full p-0">
                    <CardHeader className="border-b !py-4 gap-0">
                        <CardTitle className="text-base">Tạo Bản Đồ Tùy Chỉnh</CardTitle>
                        <CardDescription>Chọn một phương thức để tạo bản đồ.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="max-w-5xl mx-auto mt-8">
                            <RadioGroup
                                onValueChange={setSelectedType}
                                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                            >
                                {types.map(type => (
                                    <div key={type.value}>
                                        <RadioGroupItem
                                            value={type.value}
                                            id={type.value}
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor={type.value}
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                        >
                                            <span className="text-base font-medium">
                                                {type.label}
                                            </span>
                                            <span className="text-sm text-muted-foreground text-center">
                                                {type.description}
                                            </span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </CardContent>
                </Card>
            )}
            {typeSelection && selectedType && (
                <Card className="w-full p-0 gap-0">
                    <CardHeader className="border-b !py-4 gap-0 flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                            <Button
                                variant="outline"
                                onClick={handleChangeSelection}
                                className="size-10"
                            >
                                <ChevronLeft />
                            </Button>
                            <div>
                                <CardTitle className="text-base">{typeSelection.label}</CardTitle>
                                <CardDescription>{typeSelection.description}</CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="px-0 h-full">
                        {selectedType === "file-upload" && (
                            <div className="grid gap-2 p-8">
                                <Label htmlFor="file">Chọn File</Label>
                                <Input id="file" type="file" />
                                <div className="flex justify-between gap-2 mt-2">
                                    <p className="text-sm text-muted-foreground">
                                        Hỗ trợ các định dạng như GeoJSON, KML, CSV.
                                    </p>
                                    <Button>Tải Lên</Button>
                                </div>
                            </div>
                        )}
                        {selectedType === "coordinate-input" && (
                            <div className="grid gap-2 p-8">
                                <Textarea
                                    id="coordinates"
                                    placeholder="Ví dụ: [[lon1, lat1], [lon2, lat2], ...]"
                                    rows={6}
                                    className="font-mono"
                                />
                                <div className="flex justify-between gap-2 mt-2">
                                    <p className="text-sm text-muted-foreground">
                                        Mỗi dòng là một cặp tọa độ hoặc một danh sách các cặp tọa độ
                                        cho một đa giác.
                                    </p>
                                    <Button>Lưu Tọa Độ</Button>
                                </div>
                            </div>
                        )}
                        {selectedType === "draw-on-map" && (
                            <LazyEsriMap onPolygonDraw={handleEsriPolygonDraw} />
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
