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
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter full name of forest owner or representative"
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
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
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
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter age"
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
                            <FormLabel>Permanent/Temporary Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter your address" {...field} />
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
                                <Input type="email" placeholder="Enter your email" {...field} />
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
                            <FormLabel>National ID Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your national ID number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="idIssueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ID Issue Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={`w-full justify-start font-normal ${
                                                    !field.value ? "text-muted-foreground" : ""
                                                }`}
                                            >
                                                {field.value
                                                    ? new Date(field.value).toLocaleDateString()
                                                    : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    field.value ? new Date(field.value) : undefined
                                                }
                                                onSelect={date => {
                                                    field.onChange(
                                                        date ? date.toISOString().slice(0, 10) : ""
                                                    );
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="idIssuePlace"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ID Issue Place</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter ID issue place" {...field} />
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
