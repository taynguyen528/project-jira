import { useEffect } from "react";

// import redux
import { projectActions } from "../../store/quanLyProject/projectSlice";
import { AppDispatch } from "../../store/index";
import { spinnerActions } from "../../store/quanLySpinner/spinnerSlice";

// import local services
import { projectApi } from "../../api/projectApi";

// import antd component
import { message } from "antd";

const projectHooks = {
  useFetchProjectList: (
    dispatch: AppDispatch,
    successMessage: string | null
  ) => {
    useEffect(() => {
      dispatch(spinnerActions.setLoadingOn());
      projectApi
        .getAll()
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
    }, []);
  },
};

export default projectHooks;
