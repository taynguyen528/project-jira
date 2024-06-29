import { UserEditModalTemplate } from "template/UserMgmt";
import { IUserActionProps } from "types";

export const UserEditModal = ({ user, onSuccess }: IUserActionProps) => {
  return <UserEditModalTemplate user={user} onSuccess={onSuccess} />;
};
