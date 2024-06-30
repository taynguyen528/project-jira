import { UserEditModalTemplate } from "userMgmtTpl";
import { IUserActionProps } from "types";

export const UserEditModal = ({ user, onSuccess }: IUserActionProps) => {
  return <UserEditModalTemplate user={user} onSuccess={onSuccess} />;
};
