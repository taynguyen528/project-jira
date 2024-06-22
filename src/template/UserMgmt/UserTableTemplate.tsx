import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { UserUpdate, IUserTableProps } from "types";

export const UserTableTemplate = ({ userList }: IUserTableProps) => {
  let headColumns: ColumnsType<UserUpdate> = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        return <span className="text-red-500 font-medium">{text}</span>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Edit",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <Table rowKey={Math.random} columns={headColumns} dataSource={userList} />
  );
};
