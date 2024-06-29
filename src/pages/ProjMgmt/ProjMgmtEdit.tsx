import { ProjMgmtEditTemplate } from "template/ProjMgmt/ProjMgmtEditTemplate";
import { IProjectEdit } from "types";

export const ProjMgmtEdit = ({ project }: IProjectEdit) => {
  return <ProjMgmtEditTemplate project={project} />;
};
