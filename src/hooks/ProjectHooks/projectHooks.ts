import { useEffect } from "react";

// import redux
import { projectActions } from "projSlice";
import { AppDispatch } from "store";
import { spinnerActions } from "spinnerSlice";

// import local services
import { projectApi } from "api";

// import antd component
import { message } from "antd";

export const projectHooks = {
  useFetchProjectList: (
    dispatch: AppDispatch,
    successMessage: string | null
  ) => {
    useEffect(() => {
      dispatch(spinnerActions.setLoadingOn());
      projectApi
        .getAllProject()
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
