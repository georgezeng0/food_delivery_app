import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

const initialState = {
    isLoading: false,
    error: {
        isError: false,
        message: ''
    },
    dishes: [],
    form: {
        name: '',
        price: 0,
        image: '',
        available: true,
        starred: false,
        category: ''
    }
};

// const ROOT = window.location.hostname
// Get dishes depending if restaurant id is passed or if "ALL" if passed
export const getDishes = createAsyncThunk(
    'dish/getDishes',
    async (r_id, thunkAPI) => {
        let url = `/api/restaurants/${r_id}/dishes`
        if (r_id === 'ALL') {
            url = '/api/dishes'
        }
        try {
            const res = await axios(url);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWIthValue(error.response.data.message);
        }
    });

export const deleteDish = createAsyncThunk(
    'dish/deleteDish',
    async (d_id, thunkAPI) => {
        try {
            const res = await axios.delete(`/api/dishes/${d_id}`);
            thunkAPI.dispatch(getDishes(res.data.restaurant))
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWIthValue(error.response.data.message);
        }
    }
)

export const createDish = createAsyncThunk(
    'dish/createDish',
    async (r_id, thunkAPI) => {
        try {
            const res = await axios.post(`/api/dishes/new`,
                {restaurant: r_id, d_id: uuid(),...thunkAPI.getState().dish.form }
            );
            thunkAPI.dispatch(emptyForm())
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWIthValue(error.response.data.message);
        }
    }
)

export const editDish = createAsyncThunk(
    'dish/editDish',
    async (d_id, thunkAPI) => {
        const {name,price,image,available,starred,category} = thunkAPI.getState().dish.form
        try {
            const res = await axios.patch(`/api/dishes/${d_id}`, {
                name,price,image,available,starred,category
            })
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWIthValue(error.response.data.message)
        }
    }
)

const dishSlice = createSlice({
  name: 'dish',
    initialState,
    reducers: {
        updateForm: (state, { payload: { name, value,checked } }) => {
            if (name === 'price') {
                value=parseInt(parseFloat(value)*100)
            }
            if (name === 'available' || name === 'starred') {
                value=checked
            }
            state.form[name]=value 
        },
        emptyForm: (state) => {
            state.form={
                name: '',
                price: 0,
                image: '',
                available: true,
                starred: false,
                category: ''
            }
        },
        populateForm: (state, { payload: d_id })=> {
            if (state.dishes.length>0) {
                const dish = state.dishes.find(item => item.d_id === d_id)
                if (dish) {
                    state.form = {
                        ...state.form,
                        name: dish.name,
                        price: dish.price,
                        image: dish.image,
                        available: dish.available,
                        starred: dish.starred,
                        category: dish.category || ""
                    }
                }
            }
        }
    },
    extraReducers: {
        [getDishes.pending]: (state) => {
            state.isLoading = true
            state.dishes=[]
        },
        [getDishes.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
            state.dishes = action.payload;
        },
        [getDishes.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        },
        [deleteDish.pending]: (state) => {
            state.isLoading=true
        },
        [deleteDish.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
        },
        [deleteDish.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        },
        [createDish.pending]: (state) => {
            state.isLoading=true
        },
        [createDish.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
        },
        [createDish.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        },
        [editDish.pending]: (state) => {
            state.isLoading=true
        },
        [editDish.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
            state.dishes=[]
        },
        [editDish.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        },
  }
});

export const { updateForm, emptyForm,populateForm } = dishSlice.actions;
export default dishSlice.reducer;
