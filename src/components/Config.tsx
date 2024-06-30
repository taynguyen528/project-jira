import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { optionApi } from "api";

type FormData = {
    username: string;
    email: string;
};

export const Config: React.FC = () => {
    const dispatch = useDispatch();
    const counter = useSelector((state: any) => state.counter);
    const navigate = useNavigate();
    const { handleSubmit, watch, control } = useForm<FormData>();

    const increment = () => {
        dispatch({ type: "increment" });
    };

    const decrement = () => {
        dispatch({ type: "decrement" });
    };

    const handleButton = () => {
        toast.success("Success");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    const username = watch("username");

    const email = watch("email");

    const allValues = watch();

    const onSubmit: SubmitHandler<FormData> = (data) =>
        alert(JSON.stringify(data));

    const handleGetData = async () => {
        try {
            const response = await optionApi.getAllTaskType();
            alert(JSON.stringify(response));
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    };
    return (
        <div className="p-[50px]">
            <div className="pb-10">
                <div className="pb-5 text-red-500 text-[30px]">Test Redux</div>
                <div className="pb-5 text-blue-500 text-[20px]">
                    Counter: {counter}
                </div>
                <Button
                    type="primary"
                    onClick={increment}
                    className="mr-[50px]"
                >
                    Increment
                </Button>
                <Button onClick={decrement}>Decrement</Button>
            </div>

            <div className="pb-10">
                <div className="pb-5 text-red-500 text-[30px]">
                    Test React-Toastify
                </div>
                <Button type="primary" onClick={() => handleButton()}>
                    Click me
                </Button>
            </div>

            <div className="pb-10">
                <div className="pb-5 text-red-500 text-[30px]">
                    Test React Router Dom
                </div>
                <Button
                    type="primary"
                    onClick={handleLoginClick}
                    className="mr-[50px]"
                >
                    Login
                </Button>
                <Button type="primary" onClick={handleRegisterClick}>
                    Register
                </Button>
            </div>

            <div className="pb-10">
                <div className="pb-5 text-red-500 text-[30px]">
                    Test React Hook Form
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <div className="mb-4">
                                <label
                                    className="block text-black-500 text-lg mb-1"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    {...field}
                                    id="username"
                                    type="text"
                                    className="border border-gray-300 rounded-md px-3 py-2 w-[50%] focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your username"
                                />
                            </div>
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <div className="mb-4">
                                <label
                                    className="block text-black-500 text-lg mb-1"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    {...field}
                                    id="email"
                                    type="email"
                                    className="border border-gray-300 rounded-md px-3 py-2 w-[50%] focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                        )}
                    />

                    <Button type="primary" onClick={handleSubmit(onSubmit)}>
                        Submit
                    </Button>

                    <div>
                        <p>Username: {username}</p>
                        <p>Email: {email}</p>
                        <p>All Values: {JSON.stringify(allValues)}</p>
                    </div>
                </form>
            </div>

            <div className="pb-10">
                <div className="pb-5 text-red-500 text-[30px]">
                    Test Config Axios
                </div>

                <Button type="primary" onClick={handleGetData}>
                    Get data
                </Button>
            </div>
        </div>
    );
};
