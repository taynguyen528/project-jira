import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../../types/Project.itf";

type InitialState = {
  project: IProject | undefined;
  projectList: Array<IProject> | undefined;
};

const initialState: InitialState = {
  project: undefined,
  projectList: undefined,
};

export const { actions: projectActions, reducer: projectReducer } = createSlice(
  {
    name: "projectSlice",
    initialState: initialState,
    reducers: {
      putProjectDetail: (state, action: PayloadAction<IProject>) => {
        state.project = action.payload;
      },
      updateProjectList: (state, action: PayloadAction<Array<IProject>>) => {
        state.projectList = action.payload;
      },
    },
  }
);
