/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "./globalActions";

// Initial State
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// Create Color Action
export const createColorAction = createAsyncThunk(
  "colors/create",
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
        `${baseURL}/colors`,
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

// Update Color Action
export const updateColorAction = createAsyncThunk(
  "colors/update",
  async ({ name, id }, { rejectWithValue, getState, dispatch }) => {
    try {
      // Token Authentication
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make http Request
      const { data } = await axios.put(
        `${baseURL}/colors/${id}`,
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

// Delete Color Action
export const deleteColorAction = createAsyncThunk(
  "colors/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      // Token Authentication
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make http Request
      const { data } = await axios.delete(`${baseURL}/colors/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch color Action
export const fetchColorAction = createAsyncThunk(
  "colors/fetch",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http Request
      const { data } = await axios.get(`${baseURL}/colors/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch All color Action
export const fetchColorsAction = createAsyncThunk(
  "colors/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // Make http Request
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// color Slices
const colorSlices = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    // Create
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deleteColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteColorAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch
    builder.addCase(fetchColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
    });
    builder.addCase(fetchColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.error = action.payload;
    });

    // Fetch All
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
    });
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
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
const colorReducer = colorSlices.reducer;

export default colorReducer;
