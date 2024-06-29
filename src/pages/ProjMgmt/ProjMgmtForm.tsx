import { ProjMgmtFormTemplate } from "template/ProjMgmt";
import { IProjectForm } from "types";

export const ProjMgmtForm = ({
  layout = "horizontal",
  size = "large",
  project,
  confirmText,
  handleOnFinish,
}: IProjectForm) => {
  return (
    <ProjMgmtFormTemplate
      layout={layout}
      size={size}
      project={project}
      confirmText={confirmText}
      handleOnFinish={handleOnFinish}
    />
  );
};
