import { createSlice } from '@reduxjs/toolkit'


export const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        application: [],
    },
    reducers: {
        sendApplication: (state, action) => {
            state.application = state.application.concat(action.payload);
        },
    }
})