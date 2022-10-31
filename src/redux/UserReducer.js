import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        avatar: '',
        email: '',
        skillset: [],
    },
    reducers: {
        userLogIn: (state, action) => {
            state._id = action.payload._id;
            state.avatar = action.payload.avatar;
            state.email = action.payload.email;
            state.skillset = action.payload.skillset;
        },
    }
})