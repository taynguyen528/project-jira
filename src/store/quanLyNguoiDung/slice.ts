import { createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungActionsThunks } from ".";
import { userLocalStorage } from "constant";

const initialState = {
    isFetchingLogin: false,
    isFetchingRegister: false,
    userLogin: userLocalStorage.get(),
};

export const {
    reducer: quanLyNguoiDungReducer,
    actions: quanLyNguoiDungAction,
} = createSlice({
    name: "quanLyNguoiDung",
    initialState,
    reducers: {
        logOut: (state) => {
            state.userLogin = undefined;
            userLocalStorage.remove();
        },
        updateUser: (state, action) => {
            state.userLogin = action.payload;
            userLocalStorage.set(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                quanLyNguoiDungActionsThunks.loginThunk.pending,
                (state) => {
                    state.isFetchingLogin = true;
                }
            )
            .addCase(
                quanLyNguoiDungActionsThunks.loginThunk.fulfilled,
                (state, { payload }) => {
                    state.isFetchingLogin = false;
                    userLocalStorage.set(payload.content);
                    state.userLogin = payload;
                }
            )
            .addCase(
                quanLyNguoiDungActionsThunks.loginThunk.rejected,
                (state) => {
                    state.isFetchingLogin = false;
                }
            )
            .addCase(
                quanLyNguoiDungActionsThunks.registerThunk.pending,
                (state) => {
                    state.isFetchingRegister = true;
                }
            )
            .addCase(
                quanLyNguoiDungActionsThunks.registerThunk.fulfilled,
                (state, { payload }) => {
                    state.isFetchingRegister = false;
                }
            )
            .addCase(
                quanLyNguoiDungActionsThunks.registerThunk.rejected,
                (state, action) => {
                    state.isFetchingRegister = false;
                }
            );
    },
});
