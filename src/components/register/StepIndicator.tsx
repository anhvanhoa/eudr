import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { steps } from "./step";

interface StepIndicatorProps {
    currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.number;
                    const isCompleted = currentStep > step.number;
                    return (
                        <div key={step.number} className="flex flex-col items-center w-full">
                            <div className="flex items-center justify-center w-full gap-1">
                                <div
                                    className={cn(
                                        "flex-1 h-1 transition-all duration-200 bg-gray-200 rounded-e-full",
                                        {
                                            "bg-green-600": currentStep >= step.number,
                                            "opacity-0": index === 0,
                                        }
                                    )}
                                />
                                <div
                                    className={cn(
                                        "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200",
                                        {
                                            "border-blue-500 bg-blue-500 text-white": isActive,
                                            "border-gray-300 bg-gray-300 opacity-60":
                                                !isActive && !isCompleted,
                                            "border-green-600 bg-green-600 text-white": isCompleted,
                                        }
                                    )}
                                >
                                    {isCompleted && <Check className="size-6" />}
                                    {!isCompleted && <Icon className="size-6" />}
                                </div>
                                <div
                                    className={cn(
                                        "flex-1 h-1 transition-all duration-200 bg-gray-200 rounded-s-full",
                                        {
                                            "bg-green-600": currentStep > step.number,
                                            "opacity-0": index === steps.length - 1,
                                        }
                                    )}
                                />
                            </div>
                            <p
                                className={cn(
                                    "mt-2 text-sm font-medium text-center text-gray-500",
                                    {
                                        "text-blue-600": isActive,
                                        "text-green-600": isCompleted,
                                    }
                                )}
                            >
                                {step.number}. {step.title}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;
