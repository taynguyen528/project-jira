// import redux
import { useAppDispatch } from "store";
import { projectActions } from "projSlice";
import { spinnerActions } from "spinnerSlice";
import { drawerActions } from "drawerSlice";

// import local Interface
import { IProject } from "types";

// import local component
import { SectionWrapper } from "components";
import { ProjMgmtFormTemplate } from "./ProjMgmtFormTemplate";

// import local Services
import { projectApi } from "api";

import { toast } from "react-toastify";

export const ProjMgmtCreateTemplate = () => {
    const dispatch = useAppDispatch();

    const handleOnFinish = (values: IProject) => {
        dispatch(spinnerActions.setLoadingOn());
        const newProject = { ...values };
        if (!values.description) {
            newProject.description = "";
        }
        projectApi
            .createProject(newProject)
            .then((res) => {
                dispatch(projectActions.putProjectDetail(res.content));

                toast.success("Created project successfully!");
                dispatch(drawerActions.closeDrawer());
                setTimeout(() => {
                    dispatch(projectApi.getAllAndDispatch(null));
                    dispatch(spinnerActions.setLoadingOff());
                }, 2500);
            })
            .catch((err) => {
                setTimeout(() => {
                    toast.error(err.response.data.content);
                    dispatch(spinnerActions.setLoadingOff());
                }, 2500);
            });
    };

    const pageContent = (
        <div className="form-wrapper">
            <div className="form-body">
                <ProjMgmtFormTemplate
                    layout="vertical"
                    size="large"
                    confirmText="Create Project"
                    handleOnFinish={handleOnFinish}
                />
            </div>
        </div>
    );
    return (
        <div className="create-project-page h-full">
            <SectionWrapper
                title="Add project"
                subTitle="You can change these details anytime in your project settings."
                content={pageContent}
                sectionClass="create-project-section"
            />
        </div>
    );
};
