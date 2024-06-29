import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalProps } from "types";

type InitialState = {
  modalProps: IModalProps;
};

const initialState: InitialState = {
  modalProps: {
    headerContent: null,
    open: false,
    modalContent: null,
    width: "auto",
    form: null,
    maskClosable: null,
  },
};

export const { actions: modalActions, reducer: modalReducer } = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setUpModal: (state, action: PayloadAction<IModalProps>) => {
      state.modalProps = action.payload;
      state.modalProps.open = true;
    },
    openModal: (state, action: PayloadAction<React.ReactNode>) => {
      state.modalProps.open = true;
      state.modalProps.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalProps.open = false;
    },
  },
});
