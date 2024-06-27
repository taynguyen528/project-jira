import { publicClient } from "constant/configAxios";
import { ApiResponse, StatusType, TaskType } from "types";
import { PriorityType } from "types/QuanLyPriority";

export const optionApi = {
  getAllStatus: (): Promise<ApiResponse<StatusType[]>> => {
    return publicClient.get("Status/getAll");
  },
  getAllPriority: (): Promise<ApiResponse<PriorityType[]>> => {
    return publicClient.get("Priority/getAll");
  },
  getAllTaskType: (): Promise<ApiResponse<TaskType[]>> => {
    return publicClient.get("TaskType/getAll");
  },
};


