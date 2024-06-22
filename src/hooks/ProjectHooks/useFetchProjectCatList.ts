import { useEffect } from "react";
import { projectCategoryActions } from "../../store/quanLyProjectCategory/projectCategorySlice";
import { AppDispatch } from "../../store/index";
import { projectAPI } from "../../api/projectApi";
import { IProjectCategory } from "types";

export const useFetchProjectCatList = (dispatch: AppDispatch) => {
  useEffect(() => {
    projectAPI
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
