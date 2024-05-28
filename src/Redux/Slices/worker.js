import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../axios";

export const createTable = createAsyncThunk(
  "worker/createTable",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("worker/create", params.products, {
        params: { userId: params.id },
      });

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = JSON.parse(response.data);

      localStorage.product = response.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTable = createAsyncThunk(
  "worker/fetchTable",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("worker", {
        params: { userId: params.id },
      });

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = JSON.parse(response.data);

      localStorage.table = response.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const shipProduct = createAsyncThunk(
  "worker/shipProduct",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.delete("worker/ship", params);

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = JSON.parse(response.data);

      localStorage.ship = response.data;

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  table: [],
  product: {
    amountOfPosition: 0,
    length: 0,
    width: 0,
    height: 0,
    name: "",
    unit: "",
    amount: 0,
    price: 0,
    status: "",
    bestBeforeDate: "",
    weight: 0,
  },
  ship: {
    number: 0,
  },
  status: "",
};

const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTable.pending, (state) => {
        state.ship = null;
        state.status = "pending";
      })
      .addCase(createTable.fulfilled, (state, action) => {
        state.ship = action.payload;
        state.status = "done";
      })
      .addCase(createTable.rejected, (state, action) => {
        state.ship = null;
        state.status = "error";
      })
      .addCase(fetchTable.pending, (state) => {
        state.ship = null;
        state.status = "pending";
      })
      .addCase(fetchTable.fulfilled, (state, action) => {
        state.ship = action.payload;
        state.status = "done";
      })
      .addCase(fetchTable.rejected, (state, action) => {
        state.ship = null;
        state.status = "error";
      })
      .addCase(shipProduct.pending, (state) => {
        state.ship = null;
        state.status = "pending";
      })
      .addCase(shipProduct.fulfilled, (state, action) => {
        state.ship = action.payload;
        state.status = "done";
      })
      .addCase(shipProduct.rejected, (state, action) => {
        state.ship = null;
        state.status = "error";
      });
  },
});

export const WorkerReducer = workerSlice.reducer;
