import { useCallback, useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import { ForestPlot, mockData } from "./ForestManagement";
import { Button } from "../ui/button";
import { Maximize, Minus, Navigation, Plus } from "lucide-react";

export default function ArcGISMap({
    selectedPlot,
    onPlotSelect,
}: {
    selectedPlot: ForestPlot | null;
    onPlotSelect: (plot: ForestPlot) => void;
}) {
    const mapRef = useRef<HTMLDivElement>(null);
    const sceneViewRef = useRef<MapView | null>(null);
    const graphicsLayerRef = useRef<GraphicsLayer | null>(null);
    const updateMapGraphics = useCallback(() => {
        if (typeof window === "undefined" || !graphicsLayerRef.current) return;
        graphicsLayerRef.current.removeAll();
        if (!selectedPlot) {
            mockData.forEach(plot => {
                const point = new Point({
                    longitude: plot.longitude,
                    latitude: plot.latitude,
                });
                const markerSymbol = new SimpleMarkerSymbol({
                    color: [255, 0, 0],
                    size: 12,
                    outline: {
                        color: [255, 255, 255],
                        width: 2,
                    },
                });
                const graphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol,
                    attributes: {
                        plotId: plot.id,
                        plotCode: plot.code,
                    },
                    popupTemplate: {
                        title: `Lô rừng: ${plot.code}`,
                        content: `
                        <div>
                            <p><strong>Địa chỉ:</strong> ${plot.location}</p>
                            <p><strong>Diện tích:</strong> ${plot.area.toLocaleString()} ha</p>
                            <p><strong>Trạng thái:</strong> ${plot.status}</p>
                        </div>
                        `,
                    },
                });
                graphicsLayerRef.current?.add(graphic);
            });
        } else {
            const rings = [selectedPlot.boundary];
            const polygon = new Polygon({
                rings: rings,
                spatialReference: { wkid: 4326 },
            });
            const fillSymbol = new SimpleFillSymbol({
                color: [255, 255, 0, 0.3],
                outline: new SimpleLineSymbol({
                    color: [255, 255, 0],
                    width: 2,
                }),
            });
            const graphic = new Graphic({
                geometry: polygon,
                symbol: fillSymbol,
                attributes: {
                    plotId: selectedPlot.id,
                    plotCode: selectedPlot.code,
                },
                popupTemplate: {
                    title: `Lô rừng: ${selectedPlot.code}`,
                    content: `
                        <div>
                        <p><strong>Địa chỉ:</strong> ${selectedPlot.location}</p>
                        <p><strong>Diện tích:</strong> ${selectedPlot.area.toLocaleString()} ha</p>
                        <p><strong>Loại đất:</strong> ${selectedPlot.landType}</p>
                        <p><strong>Trạng thái:</strong> ${selectedPlot.status}</p>
                        </div>
                    `,
                },
            });
            graphicsLayerRef.current.add(graphic);
        }
    }, [selectedPlot]);

    useEffect(() => {
        if (typeof window === "undefined" || !mapRef.current) return;
        const map = new Map({ basemap: "satellite", ground: "world-elevation" });
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
        const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [106.0, 16.0],
            zoom: 6,
            ui: { components: [] },
        });
        view.when(() => {
            updateMapGraphics();
        });
        sceneViewRef.current = view;
        graphicsLayerRef.current = graphicsLayer;
        view.on("click", function (event) {
            view.hitTest(event).then(function (response) {
                const result = response.results.find(r => "graphic" in r);
                if (result && result.graphic?.attributes?.plotId) {
                    const plot = mockData.find(p => p.id === result.graphic.attributes.plotId);
                    if (plot) {
                        onPlotSelect(plot);
                    }
                }
            });
        });
        return () => {
            view.destroy();
            sceneViewRef.current = null;
            graphicsLayerRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onPlotSelect]);

    useEffect(() => {
        if (sceneViewRef.current) {
            const view = sceneViewRef.current;
            const goToTarget = {
                center: [106.0, 16.0],
                zoom: 6,
            };

            if (selectedPlot) {
                goToTarget.center = [selectedPlot.longitude, selectedPlot.latitude];
                goToTarget.zoom = 14;
            }

            view.goTo(goToTarget)
                .then(updateMapGraphics)
                .catch(() => {});
        }
    }, [selectedPlot, updateMapGraphics]);

    const handleZoomIn = useCallback(() => {
        if (sceneViewRef.current) {
            sceneViewRef.current.zoom += 1;
        }
    }, []);

    const handleZoomOut = useCallback(() => {
        if (sceneViewRef.current) {
            sceneViewRef.current.zoom -= 1;
        }
    }, []);

    const handleNavigateHome = useCallback(() => {
        if (sceneViewRef.current) {
            sceneViewRef.current.goTo({ center: [106.0, 16.0], zoom: 6 });
        }
    }, []);

    const handleFullscreenToggle = useCallback(() => {
        const mapDiv = mapRef.current;
        if (mapDiv) {
            if (!document.fullscreenElement) {
                mapDiv.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen();
            }
        }
    }, []);

    return (
        <div className="flex-1 relative">
            {/* Map Controls */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <Button
                    size="sm"
                    variant="outline"
                    className=" cursor-pointer w-8 h-8 p-0 bg-white"
                    onClick={handleZoomIn}
                >
                    <Plus className="w-4 h-4" />
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 bg-white"
                    onClick={handleZoomOut}
                >
                    <Minus className="w-4 h-4" />
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 bg-white"
                    onClick={handleNavigateHome}
                >
                    <Navigation className="w-4 h-4" />
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 bg-white"
                    onClick={handleFullscreenToggle}
                >
                    <Maximize className="w-4 h-4" />
                </Button>
            </div>
            {/* Map Container */}
            <div ref={mapRef} className="w-full h-full" style={{ touchAction: "none" }} />
        </div>
    );
}
