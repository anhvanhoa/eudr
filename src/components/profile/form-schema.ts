import { z } from "zod";

export const citizenFormSchema = z.object({
    fullName: z.string().min(1, "Họ và tên là bắt buộc"),
    gender: z.string().min(1, "Giới tính là bắt buộc"),
    address: z.string().min(1, "Địa chỉ thường trú là bắt buộc"),
    age: z
        .string()
        .min(1, "Tuổi là bắt buộc")
        .refine(val => {
            const num = Number.parseInt(val);
            return num >= 0 && num <= 150;
        }, "Tuổi phải từ 0 đến 150"),
    citizenId: z
        .string()
        .min(9, "Căn cước công dân phải có ít nhất 9 số")
        .max(12, "Căn cước công dân không được quá 12 số"),
    frontPhoto: z.any().optional(),
    backPhoto: z.any().optional(),
    issueDate: z.string().min(1, "Ngày cấp là bắt buộc"),
    issuePlace: z.string().min(1, "Nơi cấp là bắt buộc"),
    phone: z
        .string()
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(11, "Số điện thoại không được quá 11 số"),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
});

export type CitizenFormData = z.infer<typeof citizenFormSchema>;
