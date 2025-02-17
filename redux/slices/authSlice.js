import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUrl } from "../../helpers/ApiUrl";
import * as SecureStore from "expo-secure-store";

// Your existing thunks here
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { dispatch }) => {
    try {
      const token = await SecureStore.getItemAsync("accesstoken");
      if (token) {
        await dispatch(getUserDetails());
      }
      return true;
    } catch (error) {
      return true;
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ApiUrl}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue({
          type: "GOOGLE_AUTH_ERROR",
          message: data.msg,
        });
      }
      // Store token in secure storage upon successful auth
      if (data.token) {
        await SecureStore.setItemAsync("accesstoken", data.token);
      }
      return data;
    } catch (error) {
      return rejectWithValue({
        type: "GOOGLE_AUTH_ERROR",
        message: 'Google authentication failed. Please try again.',
      });
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = await SecureStore.getItemAsync("accesstoken");
      if (!token) {
        return rejectWithValue({
          type: "AUTH_ERROR",
        });
      }

      const response = await fetch(`${ApiUrl}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          type: "AUTH_ERROR",
          message: errorData.message || "Failed to fetch user details",
        });
      }

      const data = await response.json();
      return { user: data.user, token };
    } catch (error) {
      return rejectWithValue({
        type: "AUTH_ERROR",
        message: error.message,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    isInitialized: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      // Remove token from secure storage
      SecureStore.deleteItemAsync("accesstoken");
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize Auth
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state) => {
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false;
        state.isInitialized = true;
      })

      // Google Auth
      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Authentication failed";
      })

      // Get User Details
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError, logout } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsInitialized = (state) => state.auth.isInitialized;
export const selectError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);

export default authSlice.reducer;