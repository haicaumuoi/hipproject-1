import { configureStore } from "@reduxjs/toolkit";
import { projectSlice } from "./ProjectReducer";
import { userSlice } from "./UserReducer";
import { projectListSlice } from "./ProjectListReducer";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        projects: projectSlice.reducer,
        projectList: projectListSlice.reducer,
    }
});

export default store;