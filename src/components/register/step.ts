import { Check, FileText, Shield, User } from "lucide-react";

export interface Step {
    number: number;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
}

export const steps: Step[] = [
    {
        number: 1,
        title: "Personal Information",
        icon: User,
        description: "Provide your personal details to create an account.",
    },
    {
        number: 2,
        title: "User Role",
        icon: Shield,
        description: "Select your role to tailor the experience to your needs.",
    },
    {
        number: 3,
        title: "General Information",
        icon: FileText,
        description: "Fill in additional information based on your account type.",
    },
    {
        number: 4,
        title: "Completion",
        icon: Check,
        description: "Review your information and complete the registration.",
    },
];
