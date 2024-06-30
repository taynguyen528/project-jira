import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

interface IConfirmModal {
  title: React.ReactNode;
  content: React.ReactNode;
  okText: string | "Yes";
  cancelText: string | "No";
  passOkFunc: boolean;
  passCancelFunc: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  className?: string;
}

export const ConfirmModal = ({
  content,
  okText,
  cancelText,
  passOkFunc,
  passCancelFunc,
  className,
}: IConfirmModal) => {
  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    return confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: content,
      okText: okText,
      okType: "danger",
      okButtonProps: { size: "large", className: "btn-confirm-ok" },
      cancelButtonProps: { size: "large", className: "btn-confirm-cancel" },
      cancelText: cancelText,
      onOk() {
        passOkFunc && console.log("OK");
      },
      onCancel() {
        passCancelFunc && console.log("Cancel");
      },
      wrapClassName: className,
    });
  };

  return showDeleteConfirm();
};
