export type UserUpdate = {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
};

export type UserInfo = {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  accessToken?: string;
};

export interface IUser extends UserInfo {
  action?: React.ReactNode;
}

export interface IUserTableProps {
  userList: UserInfo[];
}

export interface IUserActionProps {
  user: UserInfo;
  onSuccess: () => void;
}
