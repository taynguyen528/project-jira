import { createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungActionsThunks } from ".";
import { userLocalStorage } from "constant";

const initialState = {
    isFetchingLogin: false,
    isFetchingRegister: false,
    userLogin: fetchUserLoginFromLocalStorage(),
};

function fetchUserLoginFromLocalStorage() {
    const user = userLocalStorage.get();
    return user ? user : null;
}

export const {
    reducer: quanLyNguoiDungReducer,
    actions: quanLyNguoiDungAction,
} = createSlice({
    name: "quanLyNguoiDung",
    initialState,
    reducers: {
        logOut: (state) => {
            state.userLogin = null;
            userLocalStorage.remove();
        },
        updateUser: (state, action) => {
            state.userLogin = action.payload;
            userLocalStorage.set(action.payload);
        },
        fetchUserLogin: (state) => {
            state.userLogin = fetchUserLoginFromLocalStorage();
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
                    console.log(payload);
                    state.isFetchingRegister = false;
                }
            )
            .addCase(
                quanLyNguoiDungActionsThunks.registerThunk.rejected,
                (state, action) => {
                    console.log(action);
                    state.isFetchingRegister = false;
                }
            );
    },
});
