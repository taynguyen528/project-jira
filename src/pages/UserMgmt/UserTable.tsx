import { UserTableTemplate } from "userMgmtTpl";
import { IUserTableProps } from "types";

export const UserTable = ({ userList }: IUserTableProps) => {
  return <UserTableTemplate userList={userList} />;
};
