/* import antd components */
import { message } from "antd";

/* import local interfaces */
import { IProject, IProjectUpdate } from "../types/Project.itf";

/* import redux hooks */
import { projectActions } from "../store/quanLyProject/projectSlice";
import { spinnerActions } from "../store/quanLySpinner/spinnerSlice";
import { AppDispatch } from "../store";

// import config URL
import { privateClient } from "constant";
import { ApiResponse } from "types";
import { AxiosResponse } from "axios";

export const projectAPI = {
  createProject: async (projectInfo: IProject): Promise<any> => {
    return privateClient.post("/Project/createProjectAuthorize", projectInfo);
  },
  getAll: async (): Promise<ApiResponse> => {
    return privateClient.get(`/Project/getAllProject`);
  },
  getAllByName: async (searchKey: string): Promise<ApiResponse> => {
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
  getAllProjectCategory: async (): Promise<ApiResponse> => {
    return privateClient.get(`/ProjectCategory`);
  },
  getDetails: async (projectId: string | undefined): Promise<any> => {
    let { data } = await privateClient.get<IProject>(
      `/Project/getProjectDetail?id=${projectId}`
    );
    return data;
  },

  getDetailsThunk: (projectId: string) => (dispatch: AppDispatch) => {
    privateClient
      .get(`/Project/getProjectDetail?id=${projectId}`)
      .then((res) => {
        let resContent = res.data.content;
        resContent = {
          ...resContent,
          categoryName: resContent.projectCategory.name,
        };
        dispatch(projectActions.putProjectDetail(resContent));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(spinnerActions.setLoadingOff());
        }, 1000);
      });
  },

  getDetailsAndSetProject:
    (
      projectID: number,
      setProject: React.Dispatch<React.SetStateAction<IProject | null>>,
      successMessage?: string
    ) =>
    (dispatch: AppDispatch) => {
      privateClient
        .get(`/Project/getProjectDetail?id=${projectID}`)
        .then((res) => {
          console.log(res);
          setProject(res.data.content);
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
  update: async (
    projectId: number,
    updatedProject: IProjectUpdate
  ): Promise<ApiResponse> => {
    return privateClient.put(
      `/Project/updateProject?projectId=${projectId}`,
      updatedProject
    );
  },
  delete: async (projectID: number): Promise<ApiResponse> => {
    return privateClient.delete(`/Project/deleteProject?projectId=${projectID}`);
  },
  assignUser: async (
    projectId: number,
    userId: string
  ): Promise<ApiResponse> => {
    return privateClient.post(`/Project/assignUserProject`, { projectId, userId });
  },
  deleteMember: async (
    projectId: number,
    userId: string
  ): Promise<ApiResponse> => {
    return privateClient.post(`/Project/removeUserFromProject`, { projectId, userId });
  },
};
