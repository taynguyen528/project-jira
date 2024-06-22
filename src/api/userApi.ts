// user API

import { privateClient, publicClient } from "constant";
import { LoginType, RegisterType } from "schemas";
import { ApiResponse, UserUpdate } from "types";

type TaskGetUserListResponse = {
  content: UserUpdate[];
};

export const userAPI = {
  signIn: (payload: LoginType): Promise<ApiResponse> => {
    return publicClient.post("/Users/signin", payload);
  },
  signUp: (payload: RegisterType): Promise<ApiResponse> => {
    return publicClient.post("/Users/signup", payload);
  },
  editUser: (payload: UserUpdate): Promise<ApiResponse> => {
    return privateClient.put("/Users/editUser", payload);
  },
  deleteUser: (userId: string): Promise<ApiResponse> => {
    return privateClient.delete(`/Users/deleteUser?id=${userId}`);
  },
  getInfoUser: (userId: string): Promise<ApiResponse> => {
    return privateClient.get(`/Users/getUser?keyword=${userId}`);
  },
  getUserByKeyword: (keyword: string): Promise<any> => {    
    return privateClient.get(`/Users/getUser?keyword=${keyword}`);
  },
  getAllUser: (): Promise<ApiResponse> => {
    return privateClient.get(`/Users/getUser`);
  },
};
