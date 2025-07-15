import { CameraOff, QrCode, SearchIcon, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

declare global {
    interface Window {
        jsQR: (data: Uint8ClampedArray, width: number, height: number) => { data: string } | null;
    }
}

const GroupBtn = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [qrResult, setQrResult] = useState<string>("");
    const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const hanleOpenCamera = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: "environment" } })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                        startScan();
                    }
                })
                .catch(error => {
                    setQrResult(`Không truy cập được camera: ${error}`);
                });
        } else {
            setQrResult("getUserMedia not supported on your browser!");
        }
    };

    const startScan = () => {
        if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = setInterval(() => {
            if (!videoRef.current) return;
            const video = videoRef.current;
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = window.jsQR(imageData.data, canvas.width, canvas.height);
                    if (code) {
                        setQrResult(code.data);
                        handleCloseCamera();
                    }
                }
            }
        }, 500);
    };

    const handleCloseCamera = () => {
        if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";
        script.async = true;
        document.body.appendChild(script);
        const videoEl = videoRef.current;
        return () => {
            if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
            if (videoEl && videoEl.srcObject) {
                const stream = videoEl.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
                videoEl.srcObject = null;
            }
        };
    }, []);

    return (
        <div className="space-x-2">
            <Dialog onOpenChange={f => !f && handleCloseCamera()}>
                <DialogTrigger asChild>
                    <Button onClick={hanleOpenCamera} type="button" size="icon">
                        <QrCode className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl w-full p-0 overflow-hidden border-none">
                    <DialogHeader className="sr-only">
                        <DialogTitle />
                        <DialogDescription />
                    </DialogHeader>
                    <div className="relative">
                        {videoRef && <video className="h-full w-full" ref={videoRef}></video>}
                        <div className="absolute z-10 rounded-3xl border-[3px] border-green-500 w-1/2 aspect-square left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2"></div>
                        {qrResult && (
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white text-green-600 px-4 py-2 rounded shadow">
                                Kết quả QR: {qrResult}
                            </div>
                        )}
                        <div>
                            <DialogClose asChild>
                                <Button
                                    variant={"destructive"}
                                    onClick={handleCloseCamera}
                                    className="absolute bottom-3 left-1/2 -translate-x-1/2 cursor-pointer"
                                >
                                    <CameraOff /> Dừng
                                </Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Button type="button" size="icon">
                <Upload className="h-4 w-4" />
            </Button>

            <Sheet>
                <SheetTrigger asChild>
                    <Button type="button" size="icon" className="cursor-pointer">
                        <SearchIcon className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default GroupBtn;
