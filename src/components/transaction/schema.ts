import { z } from "zod";
export const formSchema = z.object({
    buyer: z.object({
        name: z.string().min(1, "Họ & Tên người mua là bắt buộc"),
        id: z.string().min(1, "Mã số người mua là bắt buộc"),
        address: z.string().min(1, "Địa chỉ người mua là bắt buộc"),
        phone: z.string().min(1, "Điện thoại người mua là bắt buộc"),
        email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
    }),
    seller: z.object({
        name: z.string(),
        id: z.string(),
        address: z.string(),
        phone: z.string(),
        email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
    }),
    forestLotInfo: z.string().optional(), // Placeholder for actual forest lot selection
    quantities: z
        .array(
            z.object({
                type: z.string().min(1, "Loại cây là bắt buộc"),
                quantity: z.number().min(0.01, "Khối lượng phải lớn hơn 0"),
                note: z.string().optional(),
            })
        )
        .min(1, "Phải có ít nhất một mục khối lượng"),
    contractFile: z.any().optional(),
    paymentSlipFile: z.any().optional(),
    paymentRecordFile: z.any().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
