import { UserActionTemplate } from "template/UserMgmt";
import { IUserActionProps } from "types";

export const UserAction = ({ user, onSuccess }: IUserActionProps) => {
  return <UserActionTemplate user={user} onSuccess={onSuccess} />;
};
