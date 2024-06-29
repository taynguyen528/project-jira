import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

interface ShowDeleteConfirmProps {
    title: string;
    content: string;
    onOk: () => void;
    onCancel?: () => void;
}

export const showDeleteConfirm = ({
    title,
    content,
    onOk,
    onCancel,
}: ShowDeleteConfirmProps) => {
    confirm({
        title: title,
        icon: <ExclamationCircleFilled />,
        content: content,
        okText: "Xác nhận",
        okType: "danger",
        cancelText: "Hủy",
        onOk: onOk,
        onCancel: onCancel || (() => {}),
    });
};
