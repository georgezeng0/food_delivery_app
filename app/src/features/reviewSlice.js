import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const initialState = {
  reviews: [],
  avg_rating:0.0,
  form: {
    title: '',
    body: '',
    rating: 0,
  },
  isLoading: false,
  edit: {
    isEdit: false,
    edit_id: ''
  },
  success:{
    APIsuccess: false,
    successType: ''
  },
  error: {
    isError: false,
    isLoadError:false,
    LoadMessage:'',
    message: ''
  }
};

export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async (r_id, thunkAPI) => {
    try {
      const res = await axios(`/api/reviews/${r_id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message||error.response.data)
  }
  }
)

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (r_id, thunkAPI) => {
    try {
      const input = thunkAPI.getState().review.form;
      const user = thunkAPI.getState().user.user;
      const res = await axios.post(`/api/reviews/new`,
        {...input, restaurant: r_id, author: user.email, rev_id: uuid() }
      );
      thunkAPI.dispatch(getReviews(r_id));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message||error.response.data)
  }
  }
)

export const editReview = createAsyncThunk(
  'reviews/editReview',
  async (rev_id, thunkAPI) => {
    try {
      const input = thunkAPI.getState().review.form;
      const res = await axios.patch(`/api/reviews/${rev_id}`,
        {...input}
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message||error.response.data)
  }
  }
)

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (rev_id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/reviews/${rev_id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message||error.response.data)
  }
  }
)

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    updateForm: (state, { payload: { name, value } }) => {
      if (name === "rating") {
        value=parseInt(value)
      }
      state.form[name]=value
    },
    clearForm: state => {
      state.form={
        title: '',
        body: '',
        rating: 0,
      }
    },
    resetSuccess: state => {
      state.success={
        APIsuccess: false,
        successType: ''
      }
    },
    editMode: (state, { payload: { rev_id, title, body, rating } }) => {
      state.edit.isEdit = true;
      state.edit.edit_id = rev_id;
      state.form = {
        title,body,rating
      }
    },
  },
  extraReducers: {
    [getReviews.pending]: (state) => {
      state.avg_rating = 0;
      state.error.isLoadError = false;
      state.isLoading = true;
   },
    [getReviews.fulfilled]: (state,action) => {
      state.isLoading = false;
      state.error.isLoadError = false;
      state.reviews = action.payload;
      // Calculate average rating for restaurant
      if (state.reviews.length>0) {
        const ratings = state.reviews.reduce((total, item) => {
          return total+item.rating
        }, 0)
        state.avg_rating=ratings/state.reviews.length
      }
    },
    [getReviews.rejected]: (state, action) => {
      state.isLoading = false;
      state.error.isLoadError = true;
      state.error.LoadMessage = action.payload
    },
    [createReview.pending]: (state) => {
      state.error.isError = false;
      state.isLoading = true;
   },
    [createReview.fulfilled]: (state) => {
      state.isLoading = false;
      state.error.isError = false;
      state.success.APIsuccess = true;
      state.success.successType = 'CREATE_REVIEW'
    },
    [createReview.rejected]: (state, action) => {
      state.isLoading = false;
      state.error.isError = true;
      state.error.message = action.payload
    },
    [deleteReview.pending]: (state) => {
      state.error.isError = false;
      state.isLoading = true;
   },
    [deleteReview.fulfilled]: (state) => {
      state.isLoading = false;
      state.error.isError = false;
      state.success.APIsuccess = true;
      state.success.successType = 'DELETE_REVIEW'
    },
    [deleteReview.rejected]: (state, action) => {
      state.isLoading = false;
      state.error.isError = true;
      state.error.message = action.payload
    },
    [editReview.pending]: (state) => {
      state.error.isError = false;
      state.isLoading = true;
   },
    [editReview.fulfilled]: (state) => {
      state.isLoading = false;
      state.error.isError = false;
      state.success.APIsuccess = true;
      state.success.successType = 'EDIT_REVIEW'
      state.edit = {
        isEdit: false,
        edit_id:''
      }
    },
    [editReview.rejected]: (state, action) => {
      state.isLoading = false;
      state.error.isError = true;
      state.error.message = action.payload
    },
  }
});

export const {updateForm,clearForm,resetSuccess,populateForm,editMode, } = reviewSlice.actions;
export default reviewSlice.reducer;
