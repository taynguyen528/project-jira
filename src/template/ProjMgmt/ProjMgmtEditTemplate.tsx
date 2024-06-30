// import local interface
import { IProjectEdit, IProjectUpdate } from "types";

// import redux
import { useAppDispatch } from "store";
import { spinnerActions } from "spinnerSlice";
import { drawerActions } from "drawerSlice";

// import local Services
import { projectApi } from "api";

// import local component
import { ProjMgmtFormTemplate } from "./ProjMgmtFormTemplate";

// import utils
import { toastifyUtils } from "utils";
import { SectionWrapper } from "components";

export function ProjMgmtEditTemplate({ project }: IProjectEdit) {
  const dispatch = useAppDispatch();

  const handleOnFinish = (values: IProjectUpdate) => {
    dispatch(spinnerActions.setLoadingOn());
    const updateProject = {
      ...values,
      id: project.id,
      creator: project.creator.id,
    };
    projectApi
      .update(project.id, updateProject)
      .then(() => {
        toastifyUtils("success", "Updated project successfully !");
        dispatch(drawerActions.closeDrawer());
        setTimeout(() => {
          dispatch(projectApi.getAllAndDispatch(null));
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastifyUtils("error", err.response.data.message);
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      });
  };

  return (
    <SectionWrapper
      title="Edit Project"
      content={
        <div className="form-wrapper">
          <div className="form-body">
            <ProjMgmtFormTemplate
              layout="vertical"
              size="large"
              project={project}
              confirmText="Update Project"
              handleOnFinish={handleOnFinish}
            />
          </div>
        </div>
      }
    />
  );
}
