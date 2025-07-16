import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ChevronLeft, Check } from "lucide-react";
import {
    step4Schema,
    Step4Data,
    FormRegister,
    Step3IndividualData,
    Step3BusinessData,
} from "./schemas";
import { businessRoles } from "./roleUtils";
import { useMemo } from "react";
import Link from "next/link";

interface Step4FormProps {
    onSubmit: (data: Step4Data) => void;
    onBack: () => void;
    formData: FormRegister;
}

export const Step4Form = ({ onSubmit, onBack, formData }: Step4FormProps) => {
    const form = useForm<Step4Data>({
        resolver: zodResolver(step4Schema),
        defaultValues: {
            agreeToTerms: false,
        },
    });

    const role = useMemo(() => {
        return businessRoles.find(r => r.type === formData.step2?.userRole);
    }, [formData.step2?.userRole]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-base font-semibold text-green-800 mb-4">
                        Xem lại thông tin của bạn
                    </h3>

                    <div className="space-y-2">
                        <div className="space-x-1">
                            <span className="font-semibold">Loại tài khoản:</span>
                            <span className="text-gray-600 capitalize">
                                {formData.step1?.accountType === "individual" && "Cá nhân"}
                                {formData.step1?.accountType === "business" && "Doanh nghiệp"}
                            </span>
                        </div>

                        <div className="space-x-1">
                            <span className="font-semibold">Vai trò:</span>
                            <span className="text-gray-600">{role?.name}</span>
                        </div>

                        {formData.step1?.accountType === "individual" ? (
                            <div>
                                <h4 className="font-semibold">Thông tin cá nhân:</h4>
                                <p className="text-gray-600">
                                    {(formData.step3 as Step3IndividualData)?.fullName}
                                </p>
                                <p className="text-gray-600 space-x-1">
                                    <span>
                                        {(formData.step3 as Step3IndividualData)?.gender ===
                                            "female" && "Nữ"}
                                        {(formData.step3 as Step3IndividualData)?.gender ===
                                            "male" && "Nam"}
                                        {(formData.step3 as Step3IndividualData)?.gender ===
                                            "other" && "Khác"}
                                        ,
                                    </span>
                                    <span>{(formData.step3 as Step3IndividualData)?.age} tuổi</span>
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h4 className="font-semibold">Organization:</h4>
                                <p className="text-gray-600">
                                    {(formData.step3 as Step3BusinessData)?.organizationName}
                                </p>
                                <p className="text-gray-600">
                                    Đại diện pháp lý:{" "}
                                    {(formData.step3 as Step3BusinessData)?.legalRepresentativeName}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                        <FormItem className="flex items-start pace-y-0 rounded-md border p-4">
                            <div className="flex items-start space-x-3">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="gap-1 data-[error=true]:*:text-destructive">
                                        <span>
                                            Tôi xác nhận rằng tất cả thông tin đã cung cấp là chính
                                            xác và đồng ý với
                                        </span>
                                        <Link className="text-blue-600" href="/">
                                            điều khoản dịch vụ
                                        </Link>
                                    </FormLabel>
                                    <p className="text-sm text-muted-foreground">
                                        Bằng cách nhấp vào{" "}
                                        <span className="text-primary">Hoàn tất đăng ký</span>, bạn
                                        xác nhận rằng bạn đã đọc, hiểu và đồng ý với các điều khoản
                                        và điều kiện của chúng tôi.
                                    </p>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="px-4 cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" /> Quay lại
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 bg-green-600 hover:bg-green-700 cursor-pointer"
                    >
                        Hoàn thành đăng ký <Check className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        </Form>
    );
};
