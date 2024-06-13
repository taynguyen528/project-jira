import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const NotFoundTemplate = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate("/"); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <Result
                status="404"
                title={<h1 className="text-3xl font-bold">404 - Không tìm thấy trang</h1>}
                subTitle={<p className="text-lg">Trang bạn đang tìm kiếm không tồn tại.</p>}
                extra={<Button type="primary" onClick={handleBackHome}>Trở về trang chủ</Button>}
            />
        </div>
    );
};
