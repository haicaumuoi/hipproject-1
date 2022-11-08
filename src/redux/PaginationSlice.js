import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "page",
  initialState: {
    page: 1,
  },
  reducers: {
    setPagination: (state, action) => {
      state.page = action.payload;
    },
  },
});
