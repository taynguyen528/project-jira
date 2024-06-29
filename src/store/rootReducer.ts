import { combineReducers } from "@reduxjs/toolkit";

import { quanLyNguoiDungReducer } from "./quanLyNguoiDung/slice";
import { projectReducer } from "./quanLyProject/projectSlice";
import { projectCategoryReducer } from "./quanLyProjectCategory/projectCategorySlice";
import { modalReducer } from "./quanLyModal/modalSlice";
import { drawerReducer } from "./quanLyDrawer/drawerSlice";
import { spinnerReducer } from "./quanLySpinner/spinnerSlice";

const rootReducer = combineReducers({
  quanLyNguoiDung: quanLyNguoiDungReducer,
  projectSlice: projectReducer,
  projectCategorySlice: projectCategoryReducer,
  modalSlice: modalReducer,
  drawerSlice: drawerReducer,
  spinnerSlice: spinnerReducer,
});

export default rootReducer;
