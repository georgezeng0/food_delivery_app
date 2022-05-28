import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuid } from 'uuid'

export const getRestaurants = createAsyncThunk(
    'restaurant/getRestaurants',
    async (_, thunkAPI) => {
        try {
            const res = await axios('/api/restaurants');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWIthValue(error.response.data.message)
        }
    }
);

export const deleteRestaurant = createAsyncThunk(
    'restaurant/deleteRestaurant',
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`/api/restaurants/${id}`);
            thunkAPI.dispatch(getRestaurants())
            return res.data
        } catch (error) {
            return thunkAPI.rejectWIthValue(error.response.data.message)
        }
    }
);

export const editRestaurant = createAsyncThunk(
    'restaurant/editRestaurant',
    async (id, thunkAPI) => {
        const { r_name, cuisine, pricepoint,
            location, open, close, rating } = thunkAPI.getState().restaurant.form
        try {
            const res = await axios.patch(`/api/restaurants/${id}`,
            {r_id:id,r_name, cuisine, pricepoint,
                location, open, close, rating}
            );
            thunkAPI.dispatch(emptyForm())
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWIthValue(error.response.data.message)
        }
    }
)

export const createRestaurant = createAsyncThunk(
    'restaurant/createRestaurant',
    async (_, thunkAPI) => {
        const  input  = thunkAPI.getState().restaurant.form
        try {
            const res = await axios.post(`/api/restaurants/new`,
            {r_id:uuid(),...input }
            );
            thunkAPI.dispatch(emptyForm())
            return res.data
        } catch (error) {
            return thunkAPI.rejectWIthValue(error.response.data.message)
        }
    }
);

const initialState = {
    isLoading: false,
    error: {
        isError: false,
        message: ''
    },
    restaurants: [],
    filter: {
        search: ""
    },
    form: {
        r_name:'',
        cuisine: [],
        cuisineList: [],
        pricepoint: 1,
        location: '',
        open: '00:00',
        close: '23:00',
        rating: 0,
        owner: ''
    },
    sort: {}    
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        updateForm: (state, { payload: { name, value, checked } }) => {
            if (name === 'cuisine') {
                if (checked) {
                    state.form.cuisine.push(value)
                } else {
                    const index = state.form.cuisine.indexOf(value)
                    state.form.cuisine.splice(index, 1)
                }
            } else {
                state.form[name] = value
            }
        },
        getCuisines: (state) => {
            if (state.restaurants.length > 0) {
                const list =state.restaurants.reduce((list, item) => {
                    item.cuisine.map(cuisine => {
                        if (!list.includes(cuisine)) {
                            list.push(cuisine)
                        }
                    })
                    return list
                }, [])
                state.form.cuisineList=list
            }
        },
        populateForm: (state, { payload: id }) => {
            if (state.restaurants.length > 0) {
                const {r_name,cuisine,location,open,close,pricepoint}=state.restaurants.find(r => r.r_id === id)
                state.form={...state.form,r_name,cuisine,location,open,close,pricepoint}
            }
        },
        emptyForm: state => {
            state.form = {
                r_name: '',
                cuisine: [],
                cuisineList: [],
                pricepoint: 1,
                location: '',
                open: '00:00',
                close: '23:00',
                rating: 0,
                owner: ''
            }
        }
    },
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
        },
        [createRestaurant.pending]: (state) => {
            state.isLoading = true;
        },
        [createRestaurant.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
            // TBD - success deletion action / message
        },
        [createRestaurant.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        },
        [editRestaurant.pending]: (state) => {
            state.isLoading = true;
        },
        [editRestaurant.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
            // TBD - success deletion action / message
        },
        [editRestaurant.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        }
  }
});

export const {updateForm,getCuisines,populateForm,emptyForm} = restaurantSlice.actions;
export default restaurantSlice.reducer;