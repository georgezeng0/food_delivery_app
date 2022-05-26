import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRestaurants = createAsyncThunk(
    'restaurant/getRestaurants',
    async (_, thunkAPI) => {
        try {
            const res = await axios('/api/restaurants');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWIthValue(error.response.data.error)
        }
    }
);

export const deleteRestaurant = createAsyncThunk(
    'restaurant/deleteRestaurant',
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`api/restaurants/${id}`);
            thunkAPI.dispatch(getRestaurants())
            return res.data
        } catch (error) {
            return thunkAPI.rejectWIthValue(error.response.data.error)
        }
    }
)

const initialState = {
    isLoading: false,
    error: {
        isError: false,
        message: ''
    },
    restaurants: [],
    dishes: [],
    filter: {
        search: ""
    },
    sort: {}    
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {},
    extraReducers: {
        [getRestaurants.pending]: (state) => {
            state.isLoading = true;
        },
        [getRestaurants.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
            state.restaurants = action.payload;
        },
        [getRestaurants.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        },
        [deleteRestaurant.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteRestaurant.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
            // TBD - success deletion action / message
        },
        [deleteRestaurant.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        }
  }
});

export default restaurantSlice.reducer;
