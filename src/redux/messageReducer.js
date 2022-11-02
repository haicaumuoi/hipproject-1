import { createSlice } from '@reduxjs/toolkit';
export const messageSlice = createSlice({
	name: 'message',
	initialState: {
		variant: '',
		message: '',
	},
	reducers: {
		setSuccessMessage: (state, action) => {
			state.variant = 'success';
			state.message = action.payload;
		},
		setErrorMessage: (state, action) => {
			state.variant = 'error';
			state.message = action.payload;
		},
		clearMessage: (state, action) => {
			state.variant = '';
			state.message = '';
		},
	},
});
