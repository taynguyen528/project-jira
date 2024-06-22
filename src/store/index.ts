import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
});

export type Store = typeof store;
export type AppDispatch = Store["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<Store["getState"]>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
