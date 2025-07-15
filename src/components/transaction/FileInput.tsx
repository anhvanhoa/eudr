import React from "react";
import { FormField, FormMessage } from "../ui/form";
import { FileText } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type FileInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
};

const FileInput = <T extends FieldValues>({ form, name }: FileInputProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field: { onChange, value, ...field } }) => (
                <div className="group flex flex-col items-center justify-center p-6 border border-gray-200 rounded-md bg-white text-center transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
                    <FileText className="h-10 w-10 text-gray-400 mb-3 group-hover:text-gray-500 transition-colors" />
                    <p className="text-base font-medium mb-3 text-gray-700">
                        3. Giấy biên bản trả tiền
                    </p>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <Label
                            htmlFor="file-upload-paymentRecordFile"
                            className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 w-full max-w-[150px]"
                        >
                            Choose File
                        </Label>
                        <Input
                            id="file-upload-paymentRecordFile"
                            type="file"
                            className="sr-only hidden"
                            onChange={e => onChange(e.target.files ? e.target.files[0] : null)}
                            {...field}
                        />
                        <span className="text-sm text-muted-foreground truncate w-full px-2">
                            {value && typeof value === "object" && "name" in value
                                ? (value as File).name
                                : "No file chosen"}
                        </span>
                    </div>
                    <FormMessage />
                </div>
            )}
        />
    );
};

export default FileInput;
