import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "api";
import { LoginType, RegisterType } from "schemas";
import { sleep } from "utils";

export const loginThunk = createAsyncThunk(
    "quanLyNguoiDung/login",
    async (payload: LoginType, { rejectWithValue }) => {
        try {
            await sleep();

            const res = await userAPI.signIn(payload);

            return res;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerThunk = createAsyncThunk(
    "quanLyNguoiDung/register",
    async (payload: RegisterType, { rejectWithValue }) => {
        try {
            await sleep();

            const res = await userAPI.signUp(payload);

            return res;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
