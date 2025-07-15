"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import Polygon from "@arcgis/core/geometry/Polygon";
import { Button } from "../ui/button";
import { PencilIcon, Trash2Icon, SaveIcon, RefreshCcwIcon } from "lucide-react";
import Graphic from "@arcgis/core/Graphic";

interface EsriMapProps {
    onPolygonDraw?: (polygonCoordinates: number[][][] | number[][][][]) => void;
}
export default function EsriMap({ onPolygonDraw }: EsriMapProps) {
    const mapDiv = useRef<HTMLDivElement>(null);
    const viewRef = useRef<MapView | null>(null);
    const graphicsLayerRef = useRef<GraphicsLayer | null>(null);
    const sketchVMRef = useRef<SketchViewModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (typeof window === "undefined" && !mapDiv.current) return;
        const map = new Map({
            ground: "world-elevation",
            basemap: "satellite",
        });
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        const view = new MapView({
            container: mapDiv.current,
            map,
            center: [106.6297, 10.8231], // TP.HCM
            zoom: 10,
            ui: { components: [] },
        });

        view.when(() => {
            setIsLoading(false);
            viewRef.current = view;
            graphicsLayerRef.current = graphicsLayer;
            const sketchVM = new SketchViewModel({
                view,
                layer: graphicsLayer!,
                polygonSymbol: {
                    type: "simple-fill",
                    color: [255, 255, 0, 0.5],
                    outline: {
                        color: [255, 0, 0],
                        width: 2,
                    },
                },
            });

            sketchVMRef.current = sketchVM;
            sketchVM.on("create", event => {
                if (event.state === "complete") {
                    const polygon = event.graphic.geometry as Polygon;
                    const coordinates = polygon.rings;
                    if (onPolygonDraw) {
                        onPolygonDraw(coordinates as number[][][]);
                    }
                }
            });
        });

        return () => {
            if (view) view.destroy();
            viewRef.current = null;
            graphicsLayerRef.current = null;
            sketchVMRef.current = null;
        };
    }, [onPolygonDraw]);

    const handleDrawPolygon = useCallback(() => {
        if (sketchVMRef.current) {
            sketchVMRef.current.create("polygon");
        }
    }, []);

    const handleClear = useCallback(() => {
        if (graphicsLayerRef.current) {
            graphicsLayerRef.current.removeAll();
        }
    }, []);

    const handleSave = useCallback(() => {
        if (graphicsLayerRef.current && onPolygonDraw) {
            const polygons = graphicsLayerRef.current.graphics
                .toArray()
                .map((g: Graphic) => g.geometry)
                .filter((geom): geom is Polygon => geom?.type === "polygon") as Polygon[];
            const allCoords = polygons.map(p => p.rings);
            onPolygonDraw(allCoords);
        }
    }, [onPolygonDraw]);

    const handleRedraw = useCallback(() => {
        if (graphicsLayerRef.current) {
            graphicsLayerRef.current.removeAll();
        }
        if (sketchVMRef.current) {
            sketchVMRef.current.create("polygon");
        }
    }, []);

    return (
        <div className="relative h-full w-full">
            <div ref={mapDiv} className="h-full w-full border-none" />
            <div className="absolute top-4 right-4 flex gap-2 *:cursor-pointer">
                <Button
                    disabled={isLoading}
                    onClick={handleDrawPolygon}
                    size="icon"
                    variant="outline"
                >
                    <PencilIcon />
                </Button>
                <Button disabled={isLoading} onClick={handleRedraw} variant="outline" size="icon">
                    <RefreshCcwIcon />
                </Button>
                <Button disabled={isLoading} onClick={handleClear} variant="outline" size="icon">
                    <Trash2Icon />
                </Button>
                <Button disabled={isLoading} onClick={handleSave} variant="outline" size="icon">
                    <SaveIcon />
                </Button>
            </div>
        </div>
    );
}
