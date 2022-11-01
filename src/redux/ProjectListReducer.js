import { createSlice } from '@reduxjs/toolkit'
import { fetchProject } from '../utils/functions/fetchProject';


export const projectListSlice = createSlice({
    name: 'projectList',
    initialState: {
        projectList: [],
    },
    reducers: {
        initProjectList: (state, action) => {
            state.projectList = action.payload;
        },
        addProject: (state, action) => {
            state.projectList.push(action.payload);
        },
        searchProjectList: (state, action) => {
            state.projectList = action.payload;
        },
        addApplicationToProject: (state, action) => {
            state.projectList = state.projectList.find(project => project._id === action.payload.projectId).applications.push(action.payload.application);
        }
    }
})