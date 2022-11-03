import { createSlice } from "@reduxjs/toolkit";

export const applicantSlice = createSlice({
  name: "applicant",
  initialState: {
    applicant: [],
  },
  reducers: {
    initApplicant: (state, action) => {
      state.applicant = action.payload;
    },
    deleteApplicant: (state, action) => {
      state.applicant = state.applicant.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});
