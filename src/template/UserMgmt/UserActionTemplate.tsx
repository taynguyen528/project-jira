import { useState } from "react";
import { userAPI } from "api";
import { IUserActionProps } from "types";
import toastify from "../../utils/toastifyUtils";
import { UserEditModalTemplate } from "./UserEditModalTemplate";
import { Button, Modal, Popconfirm } from "antd";
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export function UserActionTemplate({ user, onSuccess }: IUserActionProps) {
  let handleDeleteUser = () => {
    userAPI
      .deleteUser(user.userId)
      .then((res) => {
        toastify("success", "Delete user successfully!");
        onSuccess();
      })
      .catch((err) => {
        toastify("error", err.response.data.message);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-x-2">
      <button onClick={showModal}>
        <FormOutlined className="text-blue-500 text-2xl" />
      </button>
      <Modal
        title="Update user information"
        open={isModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="userEditForm"
            type="primary"
            key="submit"
            htmlType="submit"
          >
            Update User
          </Button>,
        ]}
      >
        <UserEditModalTemplate user={user} onSuccess={onSuccess} />
      </Modal>

      <Popconfirm
        title={
          <span className="text-lg pl-1">
            Are you sure you want to delete this user?
          </span>
        }
        onConfirm={handleDeleteUser}
        okText="Yes"
        cancelText="No"
        icon={<QuestionCircleOutlined className="top-1 text-red-500 text-xl" />}
      >
        <DeleteOutlined className="text-red-500 text-2xl" />
      </Popconfirm>
    </div>
  );
}
