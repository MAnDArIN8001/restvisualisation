import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../axios";

export const fetchInventory = createAsyncThunk(
  "accountant/fetchInventory",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.put("accountant/inventory", params.ships, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage?.user)?.token}`,
        },
        params: { userId: params.id },
      });

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = response.data.data;

      localStorage.inventory = JSON.stringify(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRevaluation = createAsyncThunk(
  "accountant/revaluation",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("accountant/revaluation", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage?.user)?.token}`,
        },
        params: { userId: params.id },
      });

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = response.data.data;

      localStorage.revaluation = JSON.stringify(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const writeOff = createAsyncThunk(
  "accountant/writeoff",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.put("accountant/writeoff", params.products, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage?.user)?.token}`,
        },
        params: { userId: params.userId },
      });

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = response.data.data;

      localStorage.writeOff = JSON.stringify(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRevaluation = createAsyncThunk(
  "accountant/createRevaluation",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.put("accountant/revaluation", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage?.user)?.token}`,
        },
        params: { userId: params?.id },
      });

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = response.data.data;

      localStorage.revalTable = JSON.stringify(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  inventory: {
    number: 0,
  },
  revaluation: [
    {
      number: 0,
      name: "",
      date: "",
    },
  ],
  revalTable: {
    numberOfAgreement: 0,
    amount: 0,
    number: 0,
    cost: 0,
  },
  writeoff: {
    number: 0,
    reasone: "",
  },
  status: "",
};

const accountantSlice = createSlice({
  name: "accountant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.inventory = null;
        state.status = "pending";
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.inventory = action.payload;
        state.status = "done";
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.inventory = null;
        state.status = "error";
      })
      .addCase(fetchRevaluation.fulfilled, (state, action) => {
        state.revaluation = action.payload;
        state.status = "done";
      })
      .addCase(fetchRevaluation.rejected, (state, action) => {
        state.revaluation = null;
        state.status = "error";
      })
      .addCase(writeOff.pending, (state) => {
        state.writeoff = null;
        state.status = "pending";
      })
      .addCase(writeOff.fulfilled, (state, action) => {
        state.writeoff = action.payload;
        state.status = "done";
      })
      .addCase(writeOff.rejected, (state, action) => {
        state.writeoff = null;
        state.status = "error";
      })
      .addCase(createRevaluation.pending, (state) => {
        state.revalTable = null;
        state.status = "pending";
      })
      .addCase(createRevaluation.fulfilled, (state, action) => {
        state.revalTable = action.payload;
        state.status = "done";
      })
      .addCase(createRevaluation.rejected, (state, action) => {
        state.revalTable = null;
        state.status = "error";
      });
  },
});

export const AccountantReducer = accountantSlice.reducer;
