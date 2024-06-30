import { useState } from "react";
import { userAPI } from "api";
import { IUserActionProps } from "types";
import { toastifyUtils } from "utils";
import { UserEditModalTemplate } from "./UserEditModalTemplate";
import { Button, Modal, Popconfirm, Tooltip } from "antd";
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export function UserActionTemplate({ user, onSuccess }: IUserActionProps) {
  let handleDeleteUser = () => {
    userAPI
      .deleteUser(user.userId)
      .then(() => {
        toastifyUtils("success", "Delete user successfully!");
        onSuccess();
      })
      .catch((err) => {
        toastifyUtils("error", err.response.data.message);
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
    <div className="space-x-2 flex items-center">
      <Tooltip title="Edit User">
        <button onClick={showModal}>
          <span className="p-2 rounded inline-flex justify-center items-center bg-indigo-500 hover:bg-indigo-400 text-xl text-white transition duration-300 cursor-pointer">
            <FormOutlined />
          </span>
        </button>
      </Tooltip>
      <Modal
        title="Update user information"
        open={isModalOpen}
        onCancel={handleCancel}
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
            Are you sure you want to delete user{" "}
            <span className="font-semibold">{user.name}</span>?
          </span>
        }
        onConfirm={handleDeleteUser}
        okText="Yes"
        okButtonProps={{
          type: "default",
          danger: true,
          size: "large",
          className: "btn-delete-ok",
        }}
        cancelText="No"
        cancelButtonProps={{
          type: "primary",
          size: "large",
          className: "btn-delete-cancel",
        }}
        icon={
          <QuestionCircleOutlined className="top-1 text-red-500 text-3xl" />
        }
      >
        <Tooltip title="Delete User">
          <span className="p-2 rounded inline-flex justify-center items-center bg-red-500 hover:bg-red-600 text-xl text-white transition duration-300 cursor-pointer">
            <DeleteOutlined />
          </span>
        </Tooltip>
      </Popconfirm>
    </div>
  );
}
