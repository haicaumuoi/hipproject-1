import { configureStore } from "@reduxjs/toolkit";
import { projectSlice } from "./ProjectReducer";
import { userSlice } from "./UserReducer";
import { projectListSlice } from "./ProjectListReducer";
import { searchListSlice } from "./SearchListReducer";
import { applicationSlice } from "./Application";
import { messageSlice } from "./messageReducer";
import { userListSlice } from "./UserListReducer";
import { applicantSlice } from "./Applicant";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userList: userListSlice.reducer,
    projects: projectSlice.reducer,
    projectList: projectListSlice.reducer,
    searchList: searchListSlice.reducer,
    application: applicationSlice.reducer,
    applicant: applicantSlice.reducer,
    message: messageSlice.reducer,
  },
});

export default store;
