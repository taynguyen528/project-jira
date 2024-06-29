import { useNavigate } from "react-router-dom";

// import redux
import { useAppDispatch } from "../../store/index";
import { projectActions } from "../../store/quanLyProject/projectSlice";
import { spinnerActions } from "../../store/quanLySpinner/spinnerSlice";

// import local Interface
import { IProject } from "../../types/Project.itf";

// import local component
import { SectionWrapper } from "../../components/SectionWrapper";
import { ProjMgmtFormTemplate } from "./ProjMgmtFormTemplate";

// import local Services
import { projectApi } from "../../api/projectApi";

// import utils
import toastify from "../../utils/toastifyUtils";

export const ProjMgmtCreateTemplate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        setTimeout(() => {
          navigate("/project", { replace: true });
          dispatch(spinnerActions.setLoadingOff());
          toastify("success", "Create project successfully !");
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastify("error", err.response.data.content);
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
        title="Add project-details"
        subTitle="You can change these details anytime in your project settings."
        content={pageContent}
        sectionClass="create-project-section"
      />
    </div>
  );
};
