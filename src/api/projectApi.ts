/* import antd components */
import { message } from "antd";

/* import local interfaces */
import { IProject, IProjectUpdate } from "../types/Project.itf";

/* import redux hooks */
import { projectActions } from "../store/quanLyProject/projectSlice";
import { spinnerActions } from "../store/quanLySpinner/spinnerSlice";
import { AppDispatch } from "../store";

// import config URL
import { privateClient, publicClient } from "constant";
import { ApiResponse, ContentProject, LstTaskDeTail, Task } from "types";

export const projectApi = {
  // anhtuan
  createProject: async (projectInfo: IProject): Promise<any> => {
    return privateClient.post("/Project/createProjectAuthorize", projectInfo);
  },
  getAll: async (): Promise<ApiResponse<IProject[]>> => {
    return privateClient.get(`/Project/getAllProject`);
  },
  getAllProject: (): Promise<ApiResponse<ContentProject[]>> => {
    return publicClient.get("Project/getAllProject");
  },
  getAllByName: async (searchKey: string): Promise<ApiResponse<object>> => {
    return privateClient.get(`/Project/getAllProject?keyword=${searchKey}`);
  },
  getAllAndDispatch:
    (successMessage: string | null) => (dispatch: AppDispatch) => {
      privateClient
        .get<any, any>(`/Project/getAllProject`)
        .then((res) => {
          dispatch(projectActions.updateProjectList(res.content));
          if (successMessage) {
            message.success(successMessage);
          }
          dispatch(spinnerActions.setLoadingOff());
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response.data.content);
          dispatch(spinnerActions.setLoadingOff());
        });
    },
  getAllProjectCategory: async (): Promise<ApiResponse<object>> => {
    return privateClient.get(`/ProjectCategory`);
  },
  getProjectDetail: (id: number): Promise<ApiResponse<Task>> => {
    return privateClient.get(`Project/getProjectDetail?id=${id}`);
  },
  update: async (
    projectId: number,
    updatedProject: IProjectUpdate
  ): Promise<ApiResponse<object>> => {
    return privateClient.put(
      `/Project/updateProject?projectId=${projectId}`,
      updatedProject
    );
  },
  delete: async (projectID: number): Promise<ApiResponse<object>> => {
    return privateClient.delete(
      `/Project/deleteProject?projectId=${projectID}`
    );
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
  getTaskDetail: (taskId: number): Promise<ApiResponse<LstTaskDeTail>> => {
    return privateClient.get(`/Project/getTaskDetail?taskId=${taskId}`);
  },
  removeTask: (taskId: number): Promise<ApiResponse<{ taskId: number }>> => {
    return privateClient.delete(`/Project/removeTask?taskId=${taskId}`);
  },
};
