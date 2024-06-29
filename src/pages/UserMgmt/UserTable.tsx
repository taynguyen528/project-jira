import { UserTableTemplate } from "template/UserMgmt";
import { IUserTableProps } from "types";

export const UserTable = ({ userList }: IUserTableProps) => {
  return <UserTableTemplate userList={userList} />;
};
