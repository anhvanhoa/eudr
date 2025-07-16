import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { step2Schema, Step2Data } from "./schemas";
import { businessRoles, individualRoles } from "./roleUtils";
import { cn } from "@/lib/utils";
import GroupButton from "./GroupButton";

interface Step2FormProps {
    onSubmit: (data: Step2Data) => void;
    onBack: () => void;
    accountType: "individual" | "business";
    initialValues?: Step2Data;
}

const defaultValues: Step2Data = {
    userRole: "",
};

export const Step2Form = ({ onSubmit, onBack, accountType, initialValues }: Step2FormProps) => {
    const form = useForm<Step2Data>({
        resolver: zodResolver(step2Schema),
        defaultValues: initialValues || defaultValues,
    });

    const roles = accountType === "business" ? businessRoles : individualRoles;
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="userRole"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-semibold">
                                Vai trò người dùng
                            </FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {roles.map(role => {
                                    const isSelected = field.value === role.type;
                                    return (
                                        <div
                                            key={role.type}
                                            className={cn(
                                                "p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md",
                                                {
                                                    "border-blue-500 bg-blue-50": isSelected,
                                                    "border-gray-200 hover:border-gray-300":
                                                        !isSelected,
                                                }
                                            )}
                                            onClick={() => field.onChange(role.type)}
                                        >
                                            <div className="flex flex-col items-center text-center space-y-3">
                                                <div
                                                    className={cn("p-3 rounded-full", {
                                                        "bg-blue-100": isSelected,
                                                        "bg-gray-100": !isSelected,
                                                    })}
                                                >
                                                    <role.icon
                                                        strokeWidth={1.5}
                                                        className={`w-8 h-8 ${isSelected ? "text-blue-600" : "text-gray-600"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <h3
                                                        className={cn("ont-semibold text-sm", {
                                                            "text-blue-700": isSelected,
                                                            "text-gray-800": !isSelected,
                                                        })}
                                                    >
                                                        {role.name}
                                                    </h3>
                                                    <p
                                                        className={`text-xs mt-1 ${
                                                            isSelected
                                                                ? "text-blue-700"
                                                                : "text-gray-500"
                                                        }`}
                                                    >
                                                        {role.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">
                        Vai trò có sẵn cho tài khoản{" "}
                        {accountType === "business" ? "doanh nghiệp" : "cá nhân"}:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {roles.map(role => {
                            return (
                                <div
                                    key={role.type}
                                    className="flex items-center space-x-3 p-2 bg-white rounded-md"
                                >
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <role.icon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-blue-900">
                                        {role.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <GroupButton onBack={onBack} />
            </form>
        </Form>
    );
};
