import { Button, Input } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store";

export const CommentComponent = () => {
    const { userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );

    return (
        <div className="mt-2 flex items-center gap-4">
            <img
                src={userLogin.avatar}
                alt="avatar"
                className="w-[40px] rounded-full"
            />
            <Input placeholder="Viết câu trả lời" style={{ width: "60%" }} />
            <Button type="primary">Submit</Button>
        </div>
    );
};
