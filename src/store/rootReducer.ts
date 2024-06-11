import { combineReducers } from "@reduxjs/toolkit";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDung/slice";

const rootReducer = combineReducers({
    quanLyNguoiDung: quanLyNguoiDungReducer,
});

export default rootReducer;
