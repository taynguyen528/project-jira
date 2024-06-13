import React, { useState, useEffect } from "react";
import { Menu, Dropdown } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { quanLyNguoiDungAction } from "store/quanLyNguoiDung/slice";
import { toast } from "react-toastify";

export const Navbar: React.FC = () => {
    const { userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(quanLyNguoiDungAction.fetchUserLogin());
    }, [dispatch]);

    const handleItemClick = (itemKey: string) => {
        if (itemKey === "1") {
            navigate(PATH.myProfile);
        } else if (itemKey === "2") {
            handleLogOut();
        }
    };

    const handleLogOut = () => {
        dispatch(quanLyNguoiDungAction.logOut());
        toast.success("Đăng xuất thành công!");
        navigate("/login");
    };

    const items = [
        {
            key: "1",
            label: (
                <span className="text-blue-700 hover:text-blue-900 text-[18px]">
                    Profile
                </span>
            ),
        },
        {
            key: "2",
            label: (
                <span className="text-blue-700 hover:text-blue-900 text-[18px]">
                    Logout
                </span>
            ),
        },
    ];

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-8">
                    <img
                        src="/jira-logo.png"
                        alt="logo"
                        className="w-24 h-auto mr-4"
                    />
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            key="1"
                            className="text-[20px] text-blue-700 cursor-pointer hover:opacity-70 transition-all duration-300"
                            onClick={() => {
                                navigate("/project");
                            }}
                        >
                            Project
                        </a>
                        <a
                            key="2"
                            className="text-[20px] text-blue-700 cursor-pointer hover:opacity-70 transition-all duration-300"
                        >
                            User
                        </a>
                        <a
                            key="3"
                            className="text-[20px] text-blue-700 cursor-pointer hover:opacity-70 transition-all duration-300"
                        >
                            Create Task
                        </a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {userLogin ? (
                        <div className="ml-auto">
                            <Dropdown
                                overlay={
                                    <Menu
                                        items={items.map((item) => ({
                                            ...item,
                                            onClick: () =>
                                                handleItemClick(item.key),
                                        }))}
                                    />
                                }
                            >
                                <a
                                    className="flex items-center gap-2 text-[20px] text-blue-700 cursor-pointer"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <div className="mr-2">
                                        <img
                                            src={userLogin.avatar}
                                            alt="User"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </div>
                                    {userLogin.name}
                                </a>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className="text-[20px] text-blue-700">
                            Loading...
                        </div>
                    )}
                    <div className="md:hidden">
                        <MenuOutlined
                            className="text-2xl cursor-pointer"
                            onClick={() => setMenuOpen(!menuOpen)}
                        />
                    </div>
                </div>
            </div>
            {menuOpen && (
                <div className="flex flex-col items-center gap-4 md:hidden">
                    <a
                        key="1"
                        className="text-[20px] text-blue-700 cursor-pointer hover:opacity-70 transition-all duration-300"
                    >
                        Project
                    </a>
                    <a
                        key="2"
                        className="text-[20px] text-blue-700 cursor-pointer hover:opacity-70 transition-all duration-300"
                    >
                        User
                    </a>
                    <a
                        key="3"
                        className="text-[20px] text-blue-700 cursor-pointer hover:opacity-70 transition-all duration-300"
                    >
                        Create Task
                    </a>
                </div>
            )}
        </div>
    );
};