"use no memo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { User, Building } from "lucide-react";
import { step1Schema, Step1Data } from "./schemas";
import GroupButton from "./GroupButton";
import { cn } from "@/lib/utils";

interface Step1FormProps {
    onSubmit: (data: Step1Data) => void;
    initialValues?: Step1Data;
}

const defaultValues: Step1Data = {
    accountType: "individual",
    phoneNumber: "",
    businessRegistrationNumber: "",
    password: "",
    confirmPassword: "",
};

export const Step1Form = ({ onSubmit, initialValues }: Step1FormProps) => {
    const form = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: initialValues || defaultValues,
    });
    const accountType = form.watch("accountType");
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-semibold">
                                Loại tài khoản
                            </FormLabel>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className={cn(
                                        "p-4 border-2 rounded-lg cursor-pointer transition-all",
                                        {
                                            "border-blue-500 bg-blue-50":
                                                field.value === "individual",
                                            "border-gray-200 hover:border-gray-300":
                                                field.value !== "individual",
                                        }
                                    )}
                                    onClick={() => field.onChange("individual")}
                                >
                                    <User
                                        strokeWidth={1.5}
                                        className="w-8 h-8 mx-auto mb-2 text-blue-500"
                                    />
                                    <p className="text-center font-medium">Cá nhân</p>
                                    <p className="text-center text-sm text-gray-500">
                                        Tài khoản cá nhân
                                    </p>
                                </div>
                                <div
                                    className={cn(
                                        "p-4 border-2 rounded-lg cursor-pointer transition-all",
                                        {
                                            "border-blue-500 bg-blue-50":
                                                field.value === "business",
                                            "border-gray-200 hover:border-gray-300":
                                                field.value !== "business",
                                        }
                                    )}
                                    onClick={() => field.onChange("business")}
                                >
                                    <Building
                                        strokeWidth={1.5}
                                        className="w-8 h-8 mx-auto mb-2 text-blue-500"
                                    />
                                    <p className="text-center font-medium">Doanh nghiệp</p>
                                    <p className="text-center text-sm text-gray-500">
                                        Tài khoản doanh nghiệp
                                    </p>
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {accountType === "individual" && (
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập số điện thoại" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {accountType === "business" && (
                    <FormField
                        control={form.control}
                        name="businessRegistrationNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Số đăng ký kinh doanh</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập số đăng ký kinh doanh" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Tạo mật khẩu" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Xác nhận mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <GroupButton isHidenBack className="justify-end" />
            </form>
        </Form>
    );
};
