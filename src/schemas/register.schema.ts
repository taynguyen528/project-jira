import { z } from "zod";

export const registerSchema = z.object({
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
    name: z.string({
        required_error: "Họ tên không được bỏ trống. Vui lòng nhập họ tên.",
    }),
    phoneNumber: z
        .string({
            required_error:
                "Số điện thoại không thể bỏ trống. Vui lòng nhập số điện thoại.",
        })
        .regex(/^[0-9]{10,11}$/, {
            message:
                "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại đúng định dạng.",
        }),
});

export type RegisterType = z.infer<typeof registerSchema>;
