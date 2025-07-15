import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ChevronLeft, Check } from "lucide-react";
import {
    step4Schema,
    Step4Data,
    FormData,
    Step3IndividualData,
    Step3BusinessData,
} from "./schemas";

interface Step4FormProps {
    onSubmit: (data: Step4Data) => void;
    onBack: () => void;
    formData: FormData;
}

export const Step4Form = ({ onSubmit, onBack, formData }: Step4FormProps) => {
    const form = useForm<Step4Data>({
        resolver: zodResolver(step4Schema),
        defaultValues: {
            agreeToTerms: false,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">
                        Review Your Information
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-700">Account Type:</h4>
                            <p className="text-gray-600 capitalize">
                                {formData.step1?.accountType}
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-700">Role:</h4>
                            <p className="text-gray-600">{formData.step2?.userRole}</p>
                        </div>

                        {formData.step1?.accountType === "individual" ? (
                            <div>
                                <h4 className="font-medium text-gray-700">Personal Information:</h4>
                                <p className="text-gray-600">
                                    {(formData.step3 as Step3IndividualData)?.fullName}
                                </p>
                                <p className="text-gray-600">
                                    {(formData.step3 as Step3IndividualData)?.gender},{" "}
                                    {(formData.step3 as Step3IndividualData)?.age} years old
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h4 className="font-medium text-gray-700">Organization:</h4>
                                <p className="text-gray-600">
                                    {(formData.step3 as Step3BusinessData)?.organizationName}
                                </p>
                                <p className="text-gray-600">
                                    Legal Rep:{" "}
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
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    I agree to the terms and conditions of registration
                                </FormLabel>
                                <p className="text-sm text-muted-foreground">
                                    By checking this box, you confirm that all information provided
                                    is accurate and agree to our terms of service.
                                </p>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={onBack} className="px-4">
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button type="submit" className="px-4 bg-green-600 hover:bg-green-700">
                        Complete Registration <Check className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        </Form>
    );
};
