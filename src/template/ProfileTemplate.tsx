import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import { userAPI } from "api";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UpdateSchemaType, updateUserSchema } from "schemas";
import { RootState } from "store";
import { quanLyNguoiDungAction } from "store/quanLyNguoiDung/slice";
import { UserInfo, UserUpdate } from "types";

export const ProfileTemplate = () => {
    const [dataUser, setDataUser] = useState<UserInfo | null>(null);
    const { userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );
    const dispatch = useDispatch();

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<UpdateSchemaType>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            id: "",
            email: "",
            name: "",
            phoneNumber: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const fetchData = async () => {
        if (!userLogin || !userLogin.id) {
            return;
        }

        try {
            const res = await userAPI.getInfoUser(userLogin.id.toString());
            if (res && Array.isArray(res.content) && res.content.length > 0) {
                const userData = res.content[0];
                const formattedUserData: UserInfo = {
                    userId: userData.userId,
                    email: userData.email,
                    name: userData.name,
                    phoneNumber: userData.phoneNumber,
                    avatar: userData.avatar,
                    accessToken: userLogin.accessToken,
                };
                setDataUser(formattedUserData);
                reset({
                    id: formattedUserData.userId.toString(),
                    email: formattedUserData.email,
                    name: formattedUserData.name,
                    phoneNumber: formattedUserData.phoneNumber,
                    password: "",
                    passwordConfirm: "",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userLogin) {
            fetchData();
        }
    }, [userLogin]);

    const onSubmit: SubmitHandler<UpdateSchemaType> = async (data) => {
        const { passwordConfirm, ...restData } = data;

        if (!dataUser) return;

        const dataSubmit: UserUpdate = {
            ...restData,
            id: dataUser.userId,
        };

        try {
            const res = await userAPI.editUser(dataSubmit);
            if (res && res.statusCode === 200) {
                toast.success(res.message);
                const updatedUser: UserInfo = {
                    ...dataUser,
                    email: dataSubmit.email,
                    name: dataSubmit.name,
                    phoneNumber: dataSubmit.phoneNumber,
                };

                if (userLogin?.accessToken) {
                    updatedUser.accessToken = userLogin.accessToken;
                }

                localStorage.setItem("USER_LOGIN", JSON.stringify(updatedUser));

                dispatch(quanLyNguoiDungAction.updateUser(updatedUser));

                fetchData();
                reset({
                    password: "",
                    passwordConfirm: "",
                });
            }
        } catch (error: any) {
            toast.error(error.response.data.content);
        }
    };

    return (
        <div className="container mx-auto px-4 mt-[30px]">
            <div className="flex flex-col md:flex-row items-center gap-[50px]">
                <div className="mb-4 md:mr-4 md:mb-0">
                    <img
                        src={userLogin?.avatar}
                        alt="img"
                        className="w-h-96 h-96 rounded-full"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-4xl">{userLogin?.name}</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <label className="text-[20px] block text-gray-700 font-semibold mb-2">
                                ID
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Controller
                                control={control}
                                name="id"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className="w-full border rounded px-3 py-2"
                                        disabled={true}
                                    />
                                )}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="text-[20px] block text-gray-700 font-semibold mb-2">
                                Họ tên
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                )}
                            />
                            {errors?.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
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
                                Số điện thoại
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                )}
                            />
                            {errors?.phoneNumber && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phoneNumber.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="text-[20px] block text-gray-700 font-semibold mb-2">
                                Mật khẩu:
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                )}
                            />
                            {errors?.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="text-[20px] block text-gray-700 font-semibold mb-2">
                                Xác nhận mật khẩu
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Controller
                                control={control}
                                name="passwordConfirm"
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                )}
                            />
                            {errors?.passwordConfirm && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.passwordConfirm.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                className="!px-7"
                            >
                                Cập nhật
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
