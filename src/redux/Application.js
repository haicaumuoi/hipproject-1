import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    application: [],
  },
  reducers: {
    initApplication: (state, action) => {
      state.application = action.payload;
    },
    sendApplication: (state, action) => {
      state.application = state.application.concat(action.payload);
    },
  },
});
