import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: {
        isError: false,
        message: ''
    },
    dishes: []
};

const dishSlice = createSlice({
  name: 'dish',
  initialState,
});

export default dishSlice.reducer;
