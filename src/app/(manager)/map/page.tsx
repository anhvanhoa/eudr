"use client";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
    interface Window {
        L: {
            map: (element: HTMLElement) => {
                setView: (coords: [number, number], zoom: number) => void;
                zoomIn: () => void;
                zoomOut: () => void;
                addLayer: (layer: unknown) => void;
            };
            tileLayer: (
                url: string,
                options?: unknown
            ) => {
                addTo: (map: unknown) => void;
            };
            marker: (coords: [number, number]) => {
                addTo: (map: unknown) => unknown;
                bindPopup: (content: string) => unknown;
            };
        };
    }
}

export default function PageMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<unknown>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load Leaflet CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        // Load Leaflet JS
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => {
            setIsLoaded(true);
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(link);
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (isLoaded && mapRef.current && !mapInstanceRef.current) {
            const map = window.L.map(mapRef.current).setView([16.0583, 108.2772], 6);
            window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(map);
            mapInstanceRef.current = map;
        }
    }, [isLoaded]);

    const addTileLayer = () => {
        if (mapInstanceRef.current) {
            const tileLayer = window.L.tileLayer(
                "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
                {
                    attribution: "&copy; <a href='https://www.google.com/maps'>Google Maps</a>",
                    maxZoom: 20,
                }
            );
            tileLayer.addTo(mapInstanceRef.current);
        }
    };

    return (
        <div className="flex-1 flex gap-2.5">
            <div className="flex-1 relative rounded-2xl overflow-hidden">
                <div className="absolute z-50 right-0 p-2 flex flex-col items-end">
                    <div className="flex gap-x-2 text-xs">
                        <p className="cursor-pointer bg-white rounded-full py-1 px-2">
                            Open Street Map
                        </p>
                        <p
                            onClick={addTileLayer}
                            className="cursor-pointer bg-white rounded-full py-1 px-2"
                        >
                            World Image
                        </p>
                        <p className="cursor-pointer bg-white rounded-full py-1 px-2">
                            Ảnh nền về tinh 12/2019
                        </p>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant={"secondary"}
                                className="mt-2 rounded-full cursor-pointer"
                            >
                                <Filter />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
                <div ref={mapRef} className="w-full h-full z-10" />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            <p className="text-gray-600">Đang tải bản đồ...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
