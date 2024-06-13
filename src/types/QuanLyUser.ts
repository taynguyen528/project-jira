export type UserUpdate = {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    password: string;
};

export type UserInfo = {
    id: number;
    email: string;
    avatar: string;
    phoneNumber: string;
    name: string;
    accessToken?: string;
};
