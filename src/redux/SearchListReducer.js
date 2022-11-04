import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { projectListSlice } from "./ProjectListReducer";

export const searchListSlice = createSlice({
  name: "searchList",
  initialState: {
    searchList: [],
  },
  reducers: {
    searchProjectList: (state, action) => {
      state.searchList = action.payload;
    },
  },
});
