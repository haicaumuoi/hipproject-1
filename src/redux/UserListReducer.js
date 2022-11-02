import { createSlice } from '@reduxjs/toolkit'

export const userListSlice = createSlice({
    name: 'userList',
    initialState: {
        userList: [],
    },
    reducers: {
        initUserList: (state, action) => {
            state.userList = action.payload;
        },
    }
})