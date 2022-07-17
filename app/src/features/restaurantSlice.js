import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuid } from 'uuid'

const initialState = {
    isLoading: false,
    success: {
        APIsuccess: false,
        successType: '',
        newRestaurantId: ''
    },
    error: {
        isError: false,
        message: ''
    },
    restaurants: [],
    sorted_restaurants: [],
    form: {
        r_name: '',
        cuisine: [],
        cuisineList: [],
        pricepoint: 1,
        location: '',
        open: '00:00',
        close: '23:00',
        owner: '',
        image: '',
        old_image: ''
    },
    sort: {
        search: '',
        cuisine: 'all',
        sort: '',
        sortList: ['A-Z', 'Z-A', 'Price Low-High', 'Price High-Low']
    },
    userLocation: {
        string: '',
        coordinates: []
    }
};

//geocoding API to get longitude and latitude data for map
export const getCoords = async (location) => {
    try {
        const res = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=GB&access_token=${process.env.REACT_APP_MAPBOX_KEY}`)
        return res.data.features[0]?.center
    } catch (error) {
        throw new Error(error.response.data || 'mapbox API error')
    }
}

export const getRestaurants = createAsyncThunk(
    'restaurant/getRestaurants',
    async (_, thunkAPI) => {
        try {
            const res = await axios('/api/restaurants');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message||error.response.data)
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
            return thunkAPI.rejectWithValue(error.response.data.message||error.response.data)
        }
    }
);

export const editRestaurant = createAsyncThunk(
    'restaurant/editRestaurant',
    async (id, thunkAPI) => {
        const { r_name, cuisine, pricepoint,
            location, open, close, image, old_image } = thunkAPI.getState().restaurant.form
        try {
            const coordinates = await getCoords(location)
            const res = await axios.patch(`/api/restaurants/${id}`,
            {r_id:id,r_name, cuisine, pricepoint,
                location, open, close, image: image || old_image, coordinates: coordinates || []}
            );
            await thunkAPI.dispatch(getRestaurants()) //Await otherwise navigation occurs before edited restaurant loaded
            thunkAPI.dispatch(emptyForm())
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message||error.response.data)
        }
    }
)

export const createRestaurant = createAsyncThunk(
    'restaurant/createRestaurant',
    async (_, thunkAPI) => {
        const input = thunkAPI.getState().restaurant.form
        const user = thunkAPI.getState().user.user
        try {
            const coordinates = await getCoords(input.location)
            const res = await axios.post(`/api/restaurants/new`,
            {r_id:uuid(),...input,owner:user.email, coordinates: coordinates || []}
            ); 
            await thunkAPI.dispatch(getRestaurants()) //Await otherwise navigation occurs before new restaurant loaded
            thunkAPI.dispatch(emptyForm())
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message||error.response.data)
        }
    }
);

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
            }
            else {
                state.form[name] = value
            }
        },
        getCuisines: (state) => {
            if (state.restaurants.length > 0) {
                const list = state.restaurants.reduce((list, item) => {
                    item.cuisine.map(cuisine => {
                        if (!list.includes(cuisine)) {
                            list.push(cuisine)
                        }
                    })
                    return list
                }, [])
                state.form.cuisineList = list
            }
        },
        populateForm: (state, { payload: id }) => {
            if (state.restaurants.length > 0) {
                const { r_name, cuisine, location, open, close, pricepoint, image } = state.restaurants.find(r => r.r_id === id)
                state.form = { ...state.form, r_name, cuisine, location, open, close, pricepoint, old_image: image }
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
                owner: '',
                image: null
            }
        },
        resetSuccess: state => {
            state.success = {
                APIsuccess: false,
                successType: '',
                newRestaurantId: ''
            }
        },
        addImageUrl: (state, action) => {
            state.form.image = action.payload
        },
        resetError: state => {
            state.error = {
                isError: false,
                message: ''
            }
        },
        updateSort: (state, { payload: { name, value } }) => {
            if (name) {
                state.sort[name] = value;
            }

            state.sorted_restaurants = state.restaurants.filter(
                r => {
                    const r_name = r.r_name.toUpperCase()
                    const search_name = (state.sort.search).toUpperCase()
                    return (r_name.includes(search_name)) &&
                        (state.sort.cuisine === 'all' || r.cuisine.includes(state.sort.cuisine))
                })
            const toSort = [...state.sorted_restaurants]
            toSort.sort(
                    (a, b) => {
                    if (state.sort.sort === 'A-Z') {
                        return a.r_name.localeCompare(b.r_name)
                    }
                    if (state.sort.sort === 'Z-A') {
                        return b.r_name.localeCompare(a.r_name)
                    }
                    if (state.sort.sort === 'Price Low-High') {
                        return a.pricepoint-b.pricepoint
                    }
                    if (state.sort.sort === 'Price High-Low') {
                        return b.pricepoint-a.pricepoint
                    }
                }
            )
            state.sorted_restaurants = [...toSort]
        },
        refreshSort: (state) => {
            state.sorted_restaurants = state.restaurants.filter(
                r => {
                    const r_name = r.r_name.toUpperCase()
                    const search_name = (state.sort.search).toUpperCase()
                    return (r_name.includes(search_name)) &&
                        (state.sort.cuisine === 'all' || r.cuisine.includes(state.sort.cuisine))
                })
            const toSort = [...state.sorted_restaurants]
            toSort.sort(
                    (a, b) => {
                    if (state.sort.sort === 'A-Z') {
                        return a.r_name.localeCompare(b.r_name)
                    }
                    if (state.sort.sort === 'Z-A') {
                        return b.r_name.localeCompare(a.r_name)
                    }
                    if (state.sort.sort === 'Price Low-High') {
                        return a.pricepoint-b.pricepoint
                    }
                    if (state.sort.sort === 'Price High-Low') {
                        return b.pricepoint-a.pricepoint
                    }
                }
            )
            state.sorted_restaurants=[...toSort]
        },
        updateUserLocation: (state, { payload }) => {
            state.userLocation.string = payload
        },
        saveUserCoords: (state, { payload }) => {
            state.userLocation.coordinates = payload
        }
    },
    extraReducers: {
        [getRestaurants.pending]: (state) => {
            state.error.isError = false;
            state.isLoading = true;
        },
        [getRestaurants.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
            state.restaurants = action.payload;
            state.sorted_restaurants = action.payload;
        },
        [getRestaurants.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        },
        [deleteRestaurant.pending]: (state) => {
            state.error.isError = false;
            state.isLoading = true;
        },
        [deleteRestaurant.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
            state.success.APIsuccess = true;
            state.success.successType = 'DELETE_RESTAURANT'
        },
        [deleteRestaurant.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        },
        [createRestaurant.pending]: (state) => {
            state.error.isError = false;
            state.isLoading = true;
        },
        [createRestaurant.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
            state.success.APIsuccess = true;
            state.success.newRestaurantId = action.payload.r_id
        },
        [createRestaurant.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        },
        [editRestaurant.pending]: (state) => {
            state.error.isError = false;
            state.isLoading = true;
        },
        [editRestaurant.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.error.isError = false;
            state.success.APIsuccess = true;
            state.success.successType = 'EDIT_RESTAURANT'
        },
        [editRestaurant.rejected]: (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            state.error.message = action.payload
        }
  }
});

export const {saveUserCoords,updateUserLocation,refreshSort,updateForm,updateSort,resetError,addImageUrl,getCuisines,populateForm,emptyForm,resetSuccess} = restaurantSlice.actions;
export default restaurantSlice.reducer;
