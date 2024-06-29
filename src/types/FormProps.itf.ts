import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormLayout } from "antd/lib/form/Form";
// import local interface
import { IProject } from "../types/Project.itf";
// import { ITask } from "../Task/Task.itf";
import { UserUpdate } from "../types/QuanLyUser";

export interface IFormProps {
  layout?: FormLayout;
  size?: SizeType;
}

export interface IProjectForm extends IFormProps {
  project?: IProject;
  confirmText: string;
  handleOnFinish: (value: any) => void;
}

export interface ITaskForm extends IFormProps {
  project?: IProject;
  task?: ITask;
  buttonText?: string;
  handleOnFinish?: (value: any) => void;
}

export interface IProfileForm extends IFormProps {
  user: UserUpdate;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
