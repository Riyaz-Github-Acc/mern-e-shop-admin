/* eslint-disable no-unused-vars */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseURL from "../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "./globalActions";

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
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { userName, email, password, file } = payload;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // FormData
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("file", file);

      // Make http request
      const { data } = await axios.post(
        `${baseURL}/users/register`,
        formData,
        config
      );
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

// Logout Action
export const logoutAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // Remove Token
    localStorage.removeItem("userToken");
    return true;
  }
);

// Update User Shipping Address Action
export const updateUserShippingAddressAction = createAsyncThunk(
  "users/update-shipping-address",
  async (
    { firstName, lastName, address, city, postalCode, state, country, phone },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      // Token Authentication
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make http request
      const { data } = await axios.put(
        `${baseURL}/users/update/shipping`,
        {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          state,
          country,
          phone,
        },
        config
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// User Profile Action
export const getUserProfileAction = createAsyncThunk(
  "users/profile-fetched",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // Token Authentication
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make http request
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch Users Action
export const fetchUsersAction = createAsyncThunk(
  "users/fetch-All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // Token Authentication
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make http request
      const { data } = await axios.get(`${baseURL}/users`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Users Slice
const userSlices = createSlice({
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

    // Logout
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = null;
    });

    // Profile
    builder.addCase(getUserProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Shipping Address
    builder.addCase(
      updateUserShippingAddressAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      updateUserShippingAddressAction.fulfilled,
      (state, action) => {
        state.user = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      updateUserShippingAddressAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }
    );

    // Fetch All
    builder.addCase(fetchUsersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.users = false;
      state.error = action.payload;
    });

    // Reset Error Action
    builder.addCase(resetErrorAction.pending, (state) => {
      state.error = null;
    });

    // Reset Success Action
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
    });
  },
});

// Generate Reducer
const userReducer = userSlices.reducer;

export default userReducer;
