import { createSlice } from '@reduxjs/toolkit'


export const projectListSlice = createSlice({
    name: 'projectList',
    initialState: {
        projectList: [],
    },
    reducers: {
        addProjectList: (state, action) => {
            state.projectList = action.payload;
        },
        searchProjectList: (state, action) => {
            state.projectList = action.payload;
        }
    }
})