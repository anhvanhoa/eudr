import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { step3IndividualSchema, Step3IndividualData } from "./schemas";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import GroupButton from "./GroupButton";
import { cn } from "@/lib/utils";

interface Step3IndividualFormProps {
    onSubmit: (data: Step3IndividualData) => void;
    onBack: () => void;
    initialValues?: Step3IndividualData;
}

const defaultValues: Step3IndividualData = {
    fullName: "",
    gender: "male",
    age: 18,
    address: "",
    email: "",
    nationalIdNumber: "",
    idIssueDate: "",
    idIssuePlace: "",
};

export const Step3IndividualForm = ({
    onSubmit,
    onBack,
    initialValues,
}: Step3IndividualFormProps) => {
    const form = useForm<Step3IndividualData>({
        resolver: zodResolver(step3IndividualSchema),
        defaultValues: initialValues || defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel aria-required>Họ và tên</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nhập họ và tên chủ rừng hoặc người đại diện"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Giới tính</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Nam</SelectItem>
                                            <SelectItem value="female">Nữ</SelectItem>
                                            <SelectItem value="other">Khác</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Tuổi</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Nhập tuổi"
                                        {...field}
                                        onChange={e =>
                                            field.onChange(parseInt(e.target.value) || 18)
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel aria-required>Địa chỉ thường trú/tạm trú</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Nhập địa chỉ của bạn" {...field} />
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
                                <Input type="email" placeholder="Nhập email của bạn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="nationalIdNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel aria-required>Số CCCD/CMND</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập số CCCD/CMND của bạn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="idIssueDate"
                        render={({ field }) => {
                            const date = new Date(field.value);
                            const onChangeDate = (date?: Date) => {
                                field.onChange(date?.toISOString());
                            };

                            return (
                                <FormItem>
                                    <FormLabel aria-required>Ngày cấp</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="secondary"
                                                    className={cn(
                                                        "w-full justify-start font-normal h-auto py-2.5",
                                                        {
                                                            "text-muted-foreground": !field.value,
                                                        }
                                                    )}
                                                >
                                                    {field.value &&
                                                        date.toLocaleDateString("vi-VN")}
                                                    {!field.value && "Chọn ngày"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? date : undefined}
                                                    onSelect={onChangeDate}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="idIssuePlace"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Nơi cấp</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập nơi cấp" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <GroupButton onBack={onBack} />
            </form>
        </Form>
    );
};
