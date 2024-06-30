import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProjectCategory } from "types";

type InitialState = {
  projectCategoryArr: IProjectCategory[];
};

const initialState: InitialState = {
  projectCategoryArr: [],
};

export const {
  actions: projectCategoryActions,
  reducer: projectCategoryReducer,
} = createSlice({
  name: "projectCategorySlice",
  initialState: initialState,
  reducers: {
    getAllProjectCategory: (
      state,
      action: PayloadAction<IProjectCategory[]>
    ) => {
      state.projectCategoryArr = [...action.payload];
    },
  },
});
