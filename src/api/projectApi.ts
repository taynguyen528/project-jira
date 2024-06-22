import { privateClient, publicClient } from "constant";
import { ApiResponse, ContentProject, Task } from "types";

export const projectApi = {
  getAllProject: (): Promise<ApiResponse<ContentProject[]>> => {
    return publicClient.get("Project/getAllProject");
  },
  getProjectDetail: (id: number): Promise<ApiResponse<Task>> => {
    return privateClient.get(`Project/getProjectDetail?id=${id}`);
  },
  assignUserProject: (data: {
    projectId: number;
    userId: number;
  }): Promise<ApiResponse<{ projectId: number; userId: number }>> => {
    return privateClient.post(`/Project/assignUserProject`, data);
  },
  removeUserFromProject: (data: {
    projectId: number;
    userId: number;
  }): Promise<ApiResponse<{ projectId: number; userId: number }>> => {
    return privateClient.post(`/Project/removeUserFromProject`, data);
  },
};
