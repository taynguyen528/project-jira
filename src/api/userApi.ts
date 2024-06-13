// user API

import { privateClient, publicClient } from "constant";
import { LoginType, RegisterType } from "schemas";
import { ApiResponse, UserUpdate } from "types";

export const userAPI = {
    signIn: (payload: LoginType): Promise<ApiResponse> => {
        return publicClient.post("/Users/signin", payload);
    },
    signUp: (payload: RegisterType): Promise<ApiResponse> => {
        return publicClient.post("/Users/signup", payload);
    },
    editUser: (payload: UserUpdate): Promise<ApiResponse> => {
        return publicClient.put("/Users/editUser", payload);
    },
    getInfoUser: (userId: string): Promise<ApiResponse> => {
        return privateClient.get(`/Users/getUser?keyword=${userId}`);
    },
};
