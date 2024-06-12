import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { RootState, useAppDispatch } from "store";
import { quanLyNguoiDungActionsThunks } from "store/quanLyNguoiDung";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginType, loginSchema } from "schemas";

export const LoginTemplate = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isFetchingLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );

    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        try {
            const res = await dispatch(
                quanLyNguoiDungActionsThunks.loginThunk(data)
            ).unwrap();

            if (res && res.statusCode === 200) {
                toast.success("Đăng nhập thành công.");
                reset();
                navigate("/project");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="container mx-auto flex justify-center items-center">
                <div className="hidden md:flex md:w-1/2 justify-center items-center">
                    <img
                        src="/image/background-jira.png"
                        alt="background"
                        className="max-w-full h-auto"
                    />
                </div>
                <div className="flex md:w-1/2 justify-center items-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
                    >
                        <h1 className="text-[40px] font-bold mb-6 text-center">
                            Đăng nhập
                        </h1>
                        <div className="mb-6">
                            <label className="text-[20px] block text-gray-700 font-semibold mb-2">
                                Email
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                )}
                            />
                            {errors?.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="text-[20px] block text-gray-700 font-semibold mb-2">
                                Mật khẩu
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <Input.Password
                                            {...field}
                                            className="w-full border rounded px-3 py-2"
                                            iconRender={(visible) =>
                                                visible ? (
                                                    <EyeTwoTone />
                                                ) : (
                                                    <EyeInvisibleOutlined />
                                                )
                                            }
                                            visibilityToggle
                                        />
                                    )}
                                />
                                {errors?.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center pb-3">
                            <Button
                                type="primary"
                                onClick={handleSubmit(onSubmit)}
                                loading={isFetchingLogin}
                            >
                                Đăng nhập
                            </Button>
                        </div>
                        <div className="text-center text-gray-700">
                            Bạn chưa có tài khoản?{" "}
                            <span
                                className="cursor-pointer hover:underline italic transform transition duration-300 hover:scale-105"
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                Đăng ký
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
