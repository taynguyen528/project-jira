export type UserUpdate = {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
};

export type UserInfo = {
  userId: string;
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  accessToken?: string;
  avatar: string;
};

export interface IUser extends UserInfo {
  action?: React.ReactNode;
}

export interface IUserTableProps {
  userList: UserUpdate[];
}

export interface IUserActionProps {
  user: IUser;
  onSuccess: () => void;
}
