"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2, Send } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { formSchema, FormSchema } from "./schema";
import TraderInput from "./TraderInput";
import FileInput from "./FileInput";
import { useMemo } from "react";
import GroupBtn from "./GroupBtn";
import Plots from "./Plots";

const inputsBuyer = [
    {
        required: true,
        name: "buyer.name",
        label: "Họ & Tên:",
        placeholder: "Nhập họ và tên người mua",
    },
    { required: true, name: "buyer.id", label: "Mã số:", placeholder: "Nhập mã số người mua" },
    {
        required: true,
        name: "buyer.address",
        label: "Địa chỉ:",
        placeholder: "Nhập địa chỉ người mua",
    },
    {
        required: true,
        name: "buyer.phone",
        label: "Điện thoại:",
        placeholder: "Nhập số điện thoại người mua",
    },
    { name: "buyer.email", label: "Email:", placeholder: "Nhập địa chỉ email" },
];

const inputsSeller = [
    {
        required: true,
        name: "seller.name",
        label: "Họ & Tên:",
        placeholder: "Nhập họ và tên người bán",
    },
    { required: true, name: "seller.id", label: "Mã số:", placeholder: "Nhập mã số người bán" },
    {
        required: true,
        name: "seller.address",
        label: "Địa chỉ:",
        placeholder: "Nhập địa chỉ người bán",
    },
    {
        required: true,
        name: "seller.phone",
        label: "Điện thoại:",
        placeholder: "Nhập số điện thoại người bán",
    },
    { name: "seller.email", label: "Email:", placeholder: "Nhập địa chỉ email" },
];

export default function Component() {
    const form = useForm<FormSchema>({
        defaultValues: {
            buyer: {
                name: "",
                id: "",
                address: "",
                phone: "",
                email: "",
            },
            seller: {
                name: "Nguyen Van Anh",
                id: "72c7e8eb-99e9-4bac-aa55-4b16a782e0c5",
                address: "HN",
                phone: "0334376855",
                email: "",
            },
            quantities: [{ type: "", quantity: 0, note: "" }],
        },
        resolver: zodResolver(formSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "quantities",
    });

    const onSubmit = (data: FormSchema) => {
        console.log("Form submitted:", data);
        alert("Form submitted successfully! Check console for data.");
    };

    const time = useMemo(() => {
        const now = new Date();
        return {
            time: now.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            date: now.toLocaleDateString("vi-VN"),
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-6 md:p-10 lg:p-12 font-serif">
            <div className="max-w-5xl mx-auto w-full bg-white p-8 md:p-10 lg:p-12 border border-gray-200 rounded-lg shadow-sm space-y-10">
                <div className="flex flex-col items-center text-center mb-6 gap-2 border-b pb-6 border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        BIÊN BẢN GIAO DỊCH BÁN
                    </h1>
                    <p className="text-xl font-bold text-gray-700">Mã giao dịch: GDYIUJWWOVOU</p>
                    <p className="text-base text-gray-600">
                        Ngày: {time.date} - Giờ: {time.time}
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
                        {/* I. Thông tin người mua */}
                        <section className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-700">
                                    I. Thông tin người mua
                                </h2>
                                <GroupBtn />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {inputsBuyer.map(input => (
                                    <TraderInput
                                        key={input.name}
                                        form={form}
                                        name={input.name as keyof FormSchema}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        required={input.required}
                                    />
                                ))}
                            </div>
                        </section>

                        <hr className="border-gray-200" />

                        {/* II. Thông tin người bán */}
                        <section className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-700">
                                    II. Thông tin người bán
                                </h2>
                                <GroupBtn />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {inputsSeller.map(input => (
                                    <TraderInput
                                        key={input.name}
                                        form={form}
                                        name={input.name as keyof FormSchema}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        required={input.required}
                                    />
                                ))}
                            </div>
                        </section>

                        <hr className="border-gray-200" />

                        {/* III. Thông tin lô rừng */}
                        <Plots />
                        <hr className="border-gray-200" />

                        {/* IV. Khối lượng */}
                        <section className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-700">IV. Khối lượng</h2>
                            <div className="overflow-x-auto border border-gray-200 rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="px-6 w-[50px] text-gray-600 font-semibold">
                                                STT
                                            </TableHead>
                                            <TableHead className="text-gray-600 font-semibold">
                                                Loại cây
                                            </TableHead>
                                            <TableHead className="text-gray-600 font-semibold">
                                                Khối lượng (Cây/m3)
                                            </TableHead>
                                            <TableHead className="text-gray-600 font-semibold">
                                                Ghi chú
                                            </TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {fields.map((field, index) => (
                                            <TableRow key={field.id}>
                                                <TableCell className="font-medium text-gray-700 px-6 text-center">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        control={form.control}
                                                        name={`quantities.${index}.type`}
                                                        render={({ field: controllerField }) => (
                                                            <FormItem className="space-y-1">
                                                                <FormControl>
                                                                    <Select
                                                                        onValueChange={
                                                                            controllerField.onChange
                                                                        }
                                                                        value={
                                                                            controllerField.value
                                                                        }
                                                                        name={controllerField.name}
                                                                    >
                                                                        <SelectTrigger className="w-full h-10 border-gray-300">
                                                                            <SelectValue placeholder="Chọn loại cây" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="type1">
                                                                                Loại cây 1
                                                                            </SelectItem>
                                                                            <SelectItem value="type2">
                                                                                Loại cây 2
                                                                            </SelectItem>
                                                                            <SelectItem value="type3">
                                                                                Loại cây 3
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        control={form.control}
                                                        name={`quantities.${index}.quantity`}
                                                        render={({ field: controllerField }) => (
                                                            <FormItem className="space-y-1">
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder="Nhập khối lượng"
                                                                        className="h-10 border-gray-300"
                                                                        {...controllerField}
                                                                        // Đảm bảo giá trị hiển thị là rỗng nếu là 0, ngược lại là giá trị số
                                                                        value={
                                                                            controllerField.value ===
                                                                            0
                                                                                ? ""
                                                                                : controllerField.value
                                                                        }
                                                                        // Chuyển đổi giá trị string từ input thành number hoặc 0 nếu rỗng
                                                                        onChange={e => {
                                                                            const value =
                                                                                e.target.value ===
                                                                                ""
                                                                                    ? 0
                                                                                    : Number(
                                                                                          e.target
                                                                                              .value
                                                                                      );
                                                                            controllerField.onChange(
                                                                                value
                                                                            );
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        control={form.control}
                                                        name={`quantities.${index}.note`}
                                                        render={({ field: controllerField }) => (
                                                            <FormItem className="space-y-1">
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Nhập ghi chú"
                                                                        className="h-10 border-gray-300"
                                                                        {...controllerField}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => remove(index)}
                                                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                                        aria-label="Remove row"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell
                                                onClick={() =>
                                                    append({ type: "", quantity: 0, note: "" })
                                                }
                                                colSpan={5}
                                                className="text-center text-blue-600 font-medium py-4 cursor-pointer"
                                            >
                                                <span>Thêm khối lượng mới</span>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            {form.formState.errors.quantities?.message &&
                                typeof form.formState.errors.quantities.message === "string" && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.quantities.message}
                                    </p>
                                )}
                        </section>

                        <hr className="border-gray-200" />
                        {/* V. Hồ sơ kèm theo */}
                        <section className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-700">
                                    V. Hồ sơ kèm theo
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Chọn 1 trong các tài liệu bên dưới
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FileInput
                                    form={form}
                                    name="contractFile"
                                    label="1. Hợp đồng mua bán"
                                    placeholder="Chọn hoặc tải lên file hợp đồng mua bán"
                                />
                                <FileInput
                                    form={form}
                                    name="paymentSlipFile"
                                    label="2. Biên lai thanh toán"
                                    placeholder="Chọn hoặc tải lên file biên lai thanh toán"
                                />
                                <FileInput
                                    form={form}
                                    name="paymentRecordFile"
                                    label="3. Giấy biên bản trả tiền"
                                    placeholder="Chọn hoặc tải lên file giấy biên bản trả tiền"
                                />
                            </div>
                        </section>

                        <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                            <Button
                                type="submit"
                                className="bg-emerald-700 hover:bg-emerald-800 text-white text-lg px-10 py-3 rounded-lg shadow-md transition-all duration-200 ease-in-out"
                            >
                                <Send className="mr-3 h-5 w-5" /> Gửi yêu cầu
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
