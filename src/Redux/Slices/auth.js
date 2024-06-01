import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../axios";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", params);

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = response.data.data;

      localStorage.user = JSON.stringify(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUserData = createAsyncThunk(
  "auth/registrUserData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", params);

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = response.data.data;

      localStorage.user = JSON.stringify(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: {
    id: 0,
    login: "",
    firstName: "",
    password: "",
    phone: "",
    secondName: "",
    surname: "",
    title: "",
    organizationId: "",
    token: "",
  },
  status: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    tryGetUser(state, action) {
      const isUser = localStorage?.user;

      if (isUser === null) {
        state.data = null;
        return;
      }

      state.data = isUser;
    },
    logOut(state, action) {
      localStorage.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.user = null;
        state.status = "pending";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "loaded";
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "error";
        state.data = null;
        alert("Ошибка");
      })
      .addCase(registerUserData.pending, (state) => {
        state.user = null;
        state.status = "pending";
      })
      .addCase(registerUserData.fulfilled, (state, action) => {
        state.status = "loaded";
        state.user = action.payload;
      })
      .addCase(registerUserData.rejected, (state, action) => {
        state.status = "error";
        state.user = null;
        alert("Ошибка");
      });
  },
});

export const { tryGetUser, logOut } = authSlice.actions;

export const AuthReducer = authSlice.reducer;
