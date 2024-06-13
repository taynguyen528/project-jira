import React from "react";
import { Button, Result } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";

export const ProtectedRouteTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );

    const navigate = useNavigate();

    const handleButton = () => {
        navigate("/login");
    };

    if (!userLogin) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <Result
                    status="warning"
                    title={
                        <h1 className="text-3xl font-bold">
                            Bạn cần đăng nhập để truy cập trang này
                        </h1>
                    }
                    extra={
                        <Button
                            type="primary"
                            key="console"
                            onClick={handleButton}
                        >
                            Đăng nhập
                        </Button>
                    }
                />
            </div>
        );
    }

    return <>{children}</>;
};
