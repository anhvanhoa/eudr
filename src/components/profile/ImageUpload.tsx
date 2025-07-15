"use client";

import type React from "react";

import { useState, useRef, type DragEvent } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
    label?: string;
    onFileChange: (file: File | null) => void;
    currentFile?: File | null | string;
    error?: string;
}

export function ImageUpload({ label, onFileChange, currentFile, error }: ImageUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [preview, setPreview] = useState<string | null>(() => {
        if (currentFile instanceof File) return URL.createObjectURL(currentFile);
        return currentFile ? currentFile : null;
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                handleFileSelect(file);
            }
        }
    };

    const handleFileSelect = (file: File) => {
        onFileChange(file);
        const reader = new FileReader();
        reader.onload = e => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleRemoveImage = () => {
        onFileChange(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-2">
            <div
                className={cn(
                    "relative aspect-[16/7] border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200",
                    "flex items-center justify-center",
                    {
                        "border-blue-400 bg-blue-50 ": isDragOver,
                        "border-green-400 bg-green-50": preview,
                        "border-red-400 bg-red-50": error,
                        "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100":
                            !isDragOver && !preview && !error,
                    }
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                />

                {preview && (
                    <div className="relative">
                        <Image
                            src={preview}
                            alt={label || "ảnh của bạn"}
                            width={150}
                            height={150}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 h-6 w-6 p-0 cursor-pointer rounded-full"
                            onClick={e => {
                                e.stopPropagation();
                                handleRemoveImage();
                            }}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                        <p className="text-sm text-green-600 font-medium">{label}</p>
                        <p className="text-xs text-gray-500 mt-1">Nhấp để thay đổi ảnh</p>
                    </div>
                )}
                {!preview && (
                    <div className="py-4">
                        {isDragOver && (
                            <div className="text-blue-500">
                                <ImageIcon className="mx-auto size-7 mb-3" />
                                <p className="text-sm font-medium">Thả ảnh vào đây</p>
                            </div>
                        )}
                        {!isDragOver && (
                            <div className="text-gray-400">
                                <Upload className="mx-auto size-7 mb-3" />
                                <p className="text-lg font-medium mb-1">{label}</p>
                                <p className="text-sm">Kéo thả ảnh vào đây hoặc nhấp để chọn</p>
                                <p className="text-xs mt-1">PNG, JPG, JPEG (tối đa 10MB)</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
