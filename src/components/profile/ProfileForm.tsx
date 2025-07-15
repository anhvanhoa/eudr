"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CalendarIcon,
    User,
    MapPin,
    Phone,
    Mail,
    CreditCard,
    FileText,
    Loader2Icon,
} from "lucide-react";
import { CitizenFormData, citizenFormSchema } from "./form-schema";
import { ImageUpload } from "./ImageUpload";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function ProfileForm() {
    const form = useForm<CitizenFormData>({
        resolver: zodResolver(citizenFormSchema),
        defaultValues: {
            fullName: "Nguyen Van Anh",
            gender: "male",
            address: "HN",
            age: "18",
            citizenId: "123456789",
            issueDate: "2025-11-07",
            issuePlace: "HN",
            phone: "0334376855",
            email: "",
        },
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (data: CitizenFormData) => {
        try {
            console.log("Form data:", data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Có lỗi xảy ra khi cập nhật thông tin!");
        }
    };

    return (
        <div className="min-h-screen ">
            <div className="max-w-5xl mx-auto">
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="sr-only">
                        <CardTitle className="sr-only" />
                    </CardHeader>
                    <CardContent className="px-8">
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                {/* Thông tin cá nhân */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                        Thông tin cá nhân
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Họ và tên */}
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        aria-required
                                                        className="flex items-center"
                                                    >
                                                        <User className="h-4 w-4" />
                                                        <span>Họ & tên</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="fullName" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Giới tính */}
                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        aria-required
                                                        className="flex items-center"
                                                    >
                                                        <span>Giới tính</span>
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Giới tính" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="male">
                                                                Nam
                                                            </SelectItem>
                                                            <SelectItem value="famle">
                                                                Nữ
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Địa chỉ thường trú */}
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        aria-required
                                                        className="flex items-center"
                                                    >
                                                        <MapPin className="h-4 w-4" />
                                                        <span>Địa chỉ thường trú</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="address" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Tuổi */}
                                        <FormField
                                            control={form.control}
                                            name="age"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        aria-required
                                                        className="flex items-center"
                                                    >
                                                        <span>Tuổi</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Tuổi" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Thông tin căn cước */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                        Thông tin căn cước công dân
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Căn cước công dân */}
                                        <FormField
                                            control={form.control}
                                            name="citizenId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        aria-required
                                                        className="flex items-center"
                                                    >
                                                        <CreditCard className="h-4 w-4" />
                                                        <span>Căn cước công dân</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="ID căn cước công dân"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Ngày cấp */}
                                        <FormField
                                            control={form.control}
                                            name="issueDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        aria-required
                                                        className="flex items-center"
                                                    >
                                                        <CalendarIcon className="h-4 w-4" />
                                                        <span>Ngày cấp</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    className={`w-full justify-start font-normal ${
                                                                        !field.value
                                                                            ? "text-muted-foreground"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    {field.value
                                                                        ? new Date(
                                                                              field.value
                                                                          ).toLocaleDateString()
                                                                        : "Ngày cấp"}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={
                                                                        field.value
                                                                            ? new Date(field.value)
                                                                            : undefined
                                                                    }
                                                                    onSelect={date => {
                                                                        field.onChange(
                                                                            date
                                                                                ? date
                                                                                      .toISOString()
                                                                                      .slice(0, 10)
                                                                                : ""
                                                                        );
                                                                    }}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Nơi cấp */}
                                        <FormField
                                            control={form.control}
                                            name="issuePlace"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormLabel
                                                        aria-required
                                                        className="flex items-center"
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                        <span>Nơi cấp</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nơi cấp" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Ảnh căn cước công dân */}
                                        <FormField
                                            control={form.control}
                                            name="frontPhoto"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel aria-required>
                                                        <span>Mặt trước căn cước</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <ImageUpload
                                                            onFileChange={file =>
                                                                field.onChange(file)
                                                            }
                                                            currentFile={field.value}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="backPhoto"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel aria-required>
                                                        <span>Mặt sau căn cước</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <ImageUpload
                                                            onFileChange={file =>
                                                                field.onChange(file)
                                                            }
                                                            currentFile={field.value}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Thông tin liên hệ */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                        Thông tin liên hệ
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Số điện thoại */}
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        aria-required
                                                        className="flex items-center"
                                                    >
                                                        <Phone className="h-4 w-4" />
                                                        <span>Số điện thoại</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Số điện thoại<"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Email */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center">
                                                        <Mail className="h-4 w-4" />
                                                        <span>Email</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="cursor-pointer px-9"
                                    >
                                        {isSubmitting && (
                                            <Loader2Icon className="animate-spin spin-in" />
                                        )}
                                        Cập nhật
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
