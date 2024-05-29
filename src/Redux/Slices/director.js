import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../axios";

export const createOrganization = createAsyncThunk(
  "director/createOrganization",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("accountant/organization", params);

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = JSON.parse(response.data);

      localStorage.inventory = JSON.stringify(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createWarehouse = createAsyncThunk(
  "director/createWarehouse",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("director/warehouse", params);

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = JSON.parse(response.data);

      localStorage.organization = response.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRack = createAsyncThunk(
  "director/createRack",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("director/rack", params);

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = JSON.parse(response.data);

      localStorage.rack = response.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDocs = createAsyncThunk(
  "director/fetchDocs",
  async (params, { rejectWithValue }) => {
    try {
      const { accepted, writeoff, nonverified, userId } = params;

      const response = await axios.get("director/docs", {
        params: { accepted, writeoff, nonverified, userId },
      });

      if (!response.status) {
        throw new Error("ServerError: 500");
      }

      const data = JSON.parse(response.data);

      localStorage.docs = response.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  organization: {
    INN: "",
    name: "",
    adress: "",
  },
  wearhouse: {
    organizationINN: "",
    name: "",
    adress: "",
  },
  rack: {
    organizationINN: "",
    number: 0,
    capacity: 0,
    amount: 0,
    length: 0,
    width: 0,
    height: 0,
  },
  docs: {
    accepted: false,
    writeOff: false,
    nonVerified: false,
  },
  status: "",
};

const directorSlice = createSlice({
  name: "director",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrganization.pending, (state) => {
        state.organization = null;
        state.status = "pending";
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.organization = action.payload;
        state.status = "done";
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.organization = null;
        state.status = "error";
      })
      .addCase(createWarehouse.pending, (state) => {
        state.wearhouse = null;
        state.status = "pending";
      })
      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.wearhouse = action.payload;
        state.status = "done";
      })
      .addCase(createWarehouse.rejected, (state, action) => {
        state.wearhouse = null;
        state.status = "error";
      })
      .addCase(createRack.pending, (state) => {
        state.rack = null;
        state.status = "pending";
      })
      .addCase(createRack.fulfilled, (state, action) => {
        state.rack = action.payload;
        state.status = "done";
      })
      .addCase(createRack.rejected, (state, action) => {
        state.rack = null;
        state.status = "error";
      })
      .addCase(fetchDocs.pending, (state) => {
        state.docs = null;
        state.status = "pending";
      })
      .addCase(fetchDocs.fulfilled, (state, action) => {
        state.docs = action.payload;
        state.status = "done";
      })
      .addCase(fetchDocs.rejected, (state, action) => {
        state.docs = null;
        state.status = "error";
      });
  },
});

export const DirectorReducer = directorSlice.reducer;
