import { useEffect } from "react";
import { projectCategoryActions } from "../../store/quanLyProjectCategory/projectCategorySlice";
import { AppDispatch } from "../../store/index";
import { projectApi } from "api";
import { IProjectCategory } from "types";

export const useFetchProjectCatList = (dispatch: AppDispatch) => {
  useEffect(() => {
    projectApi
      .getAllProjectCategory()
      .then((res) => {
        dispatch(
          projectCategoryActions.getAllProjectCategory(
            res.content as IProjectCategory[]
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};
