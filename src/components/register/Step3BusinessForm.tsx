import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { step3BusinessSchema, Step3BusinessData } from "./schemas";
import GroupButton from "./GroupButton";

interface Step3BusinessFormProps {
    onSubmit: (data: Step3BusinessData) => void;
    onBack: () => void;
    initialValues: Step3BusinessData;
}

const defaultValues = {
    organizationName: "",
    legalRepresentativeName: "",
    taxCode: "",
    organizationAddress: "",
    organizationPhone: "",
    email: "",
};

export const Step3BusinessForm = ({ onSubmit, onBack, initialValues }: Step3BusinessFormProps) => {
    const form = useForm<Step3BusinessData>({
        resolver: zodResolver(step3BusinessSchema),
        defaultValues: initialValues || defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên tổ chức</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên tổ chức" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="legalRepresentativeName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên người đại diện pháp luật</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên người đại diện pháp luật" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="taxCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mã số thuế</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập mã số thuế" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="organizationAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Địa chỉ tổ chức</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Nhập địa chỉ tổ chức" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="organizationPhone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại tổ chức</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập số điện thoại tổ chức" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email (Không bắt buộc)</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Nhập email tổ chức" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <Label className="text-sm font-medium text-yellow-800">
                        Giấy chứng nhận đăng ký kinh doanh (Không bắt buộc)
                    </Label>
                    <p className="text-sm text-yellow-700 mt-1">
                        Tải lên giấy chứng nhận đăng ký kinh doanh của bạn (PNG, JPG, JPEG, PDF)
                    </p>
                    <Input type="file" accept=".png,.jpg,.jpeg,.pdf" className="mt-2" />
                </div>
                <GroupButton onBack={onBack} />
            </form>
        </Form>
    );
};
