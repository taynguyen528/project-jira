import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const { actions: spinnerActions, reducer: spinnerReducer } = createSlice(
  {
    name: "spinnerSlice",
    initialState: initialState,
    reducers: {
      setLoadingOn: (state) => {
        state.isLoading = true;
      },
      setLoadingOff: (state) => {
        state.isLoading = false;
      },
    },
  }
);
