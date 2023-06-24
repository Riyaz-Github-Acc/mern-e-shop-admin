/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "./globalActions";

// Initial State
const initialState = {
  users: [],
  user: {},
  profile: {},
  loading: false,
  error: null,

  userAuth: {
    userInfo: localStorage.getItem("userToken")
      ? JSON.parse(localStorage.getItem("userToken"))
      : null,
    loading: false,
    error: null,
  },
};

// Login Action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http Request
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      // Save the User in Local Storage
      localStorage.setItem("userToken", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// User Slices
const userSlices = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUserAction.pending, (state) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.loading = false;
      state.userAuth.error = action.payload;
    });

    // Reset Error Action
    builder.addCase(resetErrorAction.pending, (state) => {
      state.error = null;
      state.userAuth.error = null;
    });
  },
});

// Generate Reducer
const userReducer = userSlices.reducer;

export default userReducer;
