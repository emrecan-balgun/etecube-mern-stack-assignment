import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogin: true,
};

export const etecubeSlice = createSlice({
  name: "etecube",
  initialState,
  reducers: {
    changeShow: (state) => {
      state.showLogin = !state.showLogin;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeShow } = etecubeSlice.actions;

export default etecubeSlice.reducer;
