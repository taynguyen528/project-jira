import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialStateDrawerReducer {
  isDrawerOpen: boolean;
  DrawerContent: React.ReactNode;
}

const initialState: IInitialStateDrawerReducer = {
  isDrawerOpen: false,
  DrawerContent: null,
};

export const { actions: drawerActions, reducer: drawerReducer } = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    handleDrawerOpen: (state, action: PayloadAction<React.ReactNode>) => {
      state.DrawerContent = action.payload;
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});
