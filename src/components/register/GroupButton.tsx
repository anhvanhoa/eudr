import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GroupButtonProps {
    onBack?: () => void;
    isHidenBack?: boolean;
    isHdenNext?: boolean;
    className?: string;
}

const GroupButton = ({ onBack, isHdenNext, isHidenBack, className }: GroupButtonProps) => {
    return (
        <div className={cn("flex justify-between", className)}>
            {!isHidenBack && (
                <Button
                    className="px-2 cursor-pointer"
                    type="button"
                    variant="outline"
                    onClick={onBack}
                >
                    <ChevronLeft className="w-4 h-4" /> Quay lại
                </Button>
            )}
            {!isHdenNext && (
                <Button type="submit" className="px-2 cursor-pointer">
                    Bước tiếp <ChevronRight className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
};

export default GroupButton;
