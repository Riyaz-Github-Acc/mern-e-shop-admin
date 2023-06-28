/* eslint-disable no-unused-vars */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseURL from "../../utils/baseURL";
import { resetErrorAction } from "./globalActions";

// Initial State
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},

  userAuth: {
    userInfo: localStorage.getItem("userToken")
      ? JSON.parse(localStorage.getItem("userToken"))
      : null,
    loading: false,
    error: null,
  },
};

// Register Action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (
    { userName, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      // Make http request
      const { data } = await axios.post(`${baseURL}/users/register`, {
        userName,
        email,
        password,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Login Action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http request
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

// Users Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    // Reset Error Action
    builder.addCase(resetErrorAction.pending, (state) => {
      state.error = null;
      state.userAuth.error = null;
    });
  },
});

// Generate Reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
