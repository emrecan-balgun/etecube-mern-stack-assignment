import { configureStore } from "@reduxjs/toolkit";

import etecubeReducer from "./etecube/etecubeSlice";

export const store = configureStore({
  reducer: {
    etecube: etecubeReducer,
  },
});
