import { ProjMgmtActionBtnsTemplate } from "template/ProjMgmt/ProjMgmtActionBtnsTemplate";
import { IProjectActionBtns } from "types";

export const ProjMgmtActionBtns = ({ project }: IProjectActionBtns) => {
  return <ProjMgmtActionBtnsTemplate project={project} />;
};
