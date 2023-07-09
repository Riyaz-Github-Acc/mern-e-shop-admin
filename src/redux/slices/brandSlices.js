/* eslint-disable no-unused-vars */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseURL from "../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "./globalActions";

// Initial State
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// Create Brand Action
export const createBrandAction = createAsyncThunk(
  "brands/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;

      // Token Authentication
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make http Request
      const { data } = await axios.post(
        `${baseURL}/brands`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Update Brand Action
export const updateBrandAction = createAsyncThunk(
  "brands/update",
  async ({ name, id }, { rejectWithValue, getState, dispatch }) => {
    try {
      // Token Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make http Request
      const { data } = await axios.put(
        `${baseURL}/brands/${id}`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Delete Brand Action
export const deleteBrandAction = createAsyncThunk(
  "brands/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      // Token Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make http Request
      const { data } = await axios.delete(`${baseURL}/brands/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch Brand Action
export const fetchBrandAction = createAsyncThunk(
  "brands/fetch",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http Request
      const { data } = await axios.get(`${baseURL}/brands/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch All Brand Action
export const fetchBrandsAction = createAsyncThunk(
  "brands/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http Request
      const { data } = await axios.get(`${baseURL}/brands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Brand Slices
const brandSlices = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    // Create
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deleteBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch
    builder.addCase(fetchBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
    });
    builder.addCase(fetchBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.error = action.payload;
    });

    // Fetch All
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
    });
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;
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
const brandReducer = brandSlices.reducer;

export default brandReducer;
