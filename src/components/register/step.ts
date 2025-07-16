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
        title: "Thông tin cá nhân",
        icon: User,
        description: "Cung cấp thông tin cá nhân của bạn để tạo tài khoản.",
    },
    {
        number: 2,
        title: "Vai trò người dùng",
        icon: Shield,
        description: "Chọn vai trò của bạn để tùy chỉnh trải nghiệm phù hợp.",
    },
    {
        number: 3,
        title: "Thông tin chung",
        icon: FileText,
        description: "Điền thêm thông tin dựa trên loại tài khoản của bạn.",
    },
    {
        number: 4,
        title: "Hoàn tất",
        icon: Check,
        description: "Xem lại thông tin và hoàn tất đăng ký.",
    },
];
