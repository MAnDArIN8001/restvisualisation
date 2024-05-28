import { configureStore } from "@reduxjs/toolkit";

import { AuthReducer } from "./Slices/auth";
import { WorkerReducer } from "./Slices/worker";
import { DirectorReducer } from "./Slices/director";
import { AccountantReducer } from "./Slices/accountant";

const store = new configureStore({
  reducer: {
    auth: AuthReducer,
    worker: WorkerReducer,
    director: DirectorReducer,
    accountant: AccountantReducer,
  },
});

export default store;
