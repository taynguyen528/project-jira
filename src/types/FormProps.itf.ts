import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormLayout } from "antd/lib/form/Form";
import { IProject } from "types";

export interface IFormProps {
  layout?: FormLayout;
  size?: SizeType;
}

export interface IProjectForm extends IFormProps {
  project?: IProject;
  confirmText: string;
  handleOnFinish: (value: any) => void;
}
