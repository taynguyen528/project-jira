import { z } from "zod";

export const updateUserSchema = z
    .object({
        id: z.string().optional(),
        email: z
            .string({
                required_error:
                    "Email không thể bỏ trống. Vui lòng nhập email.",
            })
            .email({
                message: "Email không đúng định dạng.",
            }),
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
        password: z
            .string({
                required_error:
                    "Mật khẩu không thể bỏ trống. Vui lòng nhập mật khẩu.",
            })
            .min(6, "Mật khẩu ít nhất phải 6 kí tự."),
        passwordConfirm: z
            .string({
                required_error:
                    "Xác nhận mật khẩu không thể bỏ trống. Vui lòng nhập lại mật khẩu.",
            })
            .min(6, "Xác nhận mật khẩu ít nhất phải 6 kí tự."),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Mật khẩu và xác nhận mật khẩu phải giống nhau",
        path: ["passwordConfirm"],
    });

export type UpdateSchemaType = z.infer<typeof updateUserSchema>;
