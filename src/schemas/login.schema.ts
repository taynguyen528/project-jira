import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "Email không thể bỏ trống. Vui lòng nhập email.",
        })
        .email({
            message: "Email không đúng định dạng.",
        }),
    password: z
        .string({
            required_error:
                "Mật khẩu không thể bỏ trống. Vui lòng nhập mật khẩu.",
        })
        .min(6, "Mật khẩu ít nhất phải 6 kí tự."),
});

export type LoginType = z.infer<typeof loginSchema>;
