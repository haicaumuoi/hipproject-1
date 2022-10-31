import { createSlice } from '@reduxjs/toolkit'
import { fetchProject } from '../utils/functions/fetchProject';
import React from 'react';; 

export const projectListSlice = createSlice({
    name: 'projectList',
    initialState: {
        projectList: [],
    },
    reducers: {
        addProjectList: (state, action) => {
            state.projectList = action.payload;
        }
    }
})