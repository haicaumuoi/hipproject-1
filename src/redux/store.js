import { configureStore } from "@reduxjs/toolkit";
import { projectSlice } from "./ProjectReducer";
import { userSlice } from "./UserReducer";
import { projectListSlice } from "./ProjectListReducer";
import { searchListSlice } from "./SearchListReducer";
import { applicationSlice } from "./Application";
import { messageSlice } from "./messageReducer";



const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        projects: projectSlice.reducer,
        projectList: projectListSlice.reducer,
        searchList: searchListSlice.reducer,
        application: applicationSlice.reducer,
        message: messageSlice.reducer,
    }
});

export default store;