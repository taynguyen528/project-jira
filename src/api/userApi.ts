// user API
import { privateClient, publicClient } from "constant";
import { LoginType, RegisterType } from "schemas";
import { ApiResponse, MemberTask, UserInfo, UserUpdate } from "types";

export const userAPI = {
    signIn: (payload: LoginType): Promise<ApiResponse<LoginType>> => {
        return publicClient.post("/Users/signin", payload);
    },
    signUp: (payload: RegisterType): Promise<ApiResponse<RegisterType>> => {
        return publicClient.post("/Users/signup", payload);
    },
    editUser: (payload: UserUpdate): Promise<ApiResponse<UserUpdate>> => {
        return publicClient.put("/Users/editUser", payload);
    },
    getInfoUser: (userId: string): Promise<ApiResponse<UserInfo>> => {
        return privateClient.get(`/Users/getUser?keyword=${userId}`);
    },
    getListUser: (): Promise<ApiResponse<MemberTask[]>> => {
        return privateClient.get(`/Users/getUser`);
    },
};
