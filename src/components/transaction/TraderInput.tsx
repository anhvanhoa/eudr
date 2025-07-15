import React from "react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type TraderInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
};

const TraderInput = <T extends FieldValues>({
    form,
    name,
    label,
    placeholder,
    required = false,
}: TraderInputProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-row border-b gap-0">
                    <FormLabel className="shrink-0 relative">
                        {required && (
                            <span className="text-red-500 absolute right-full mr-1">*</span>
                        )}
                        {label || name.replace(/([A-Z])/g, " $1").trim()}
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TraderInput;
