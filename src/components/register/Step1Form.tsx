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
                            <FormLabel className="text-base font-semibold">Account Type</FormLabel>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        field.value === "individual"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    onClick={() => field.onChange("individual")}
                                >
                                    <User className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                                    <p className="text-center font-medium">Individual</p>
                                    <p className="text-center text-sm text-gray-500">
                                        Personal account
                                    </p>
                                </div>
                                <div
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        field.value === "business"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    onClick={() => field.onChange("business")}
                                >
                                    <Building className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                                    <p className="text-center font-medium">Business</p>
                                    <p className="text-center text-sm text-gray-500">
                                        Company account
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
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} />
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
                                <FormLabel>Business Registration Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter business registration number"
                                        {...field}
                                    />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Create a password"
                                        {...field}
                                    />
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
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
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
