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
                            <FormLabel>Organization Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter organization name" {...field} />
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
                            <FormLabel>Legal Representative Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter legal representative name" {...field} />
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
                            <FormLabel>Tax Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter tax code" {...field} />
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
                            <FormLabel>Organization Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter organization address" {...field} />
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
                            <FormLabel>Organization Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter organization phone number" {...field} />
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
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter organization email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <Label className="text-sm font-medium text-yellow-800">
                        Business Registration Certificate (Optional)
                    </Label>
                    <p className="text-sm text-yellow-700 mt-1">
                        Upload your business registration certificate (PNG, JPG, JPEG, PDF)
                    </p>
                    <Input type="file" accept=".png,.jpg,.jpeg,.pdf" className="mt-2" />
                </div>
                <GroupButton onBack={onBack} />
            </form>
        </Form>
    );
};
