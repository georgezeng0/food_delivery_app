import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  user: {
    email: '',
    name: '',
    location: '',
    group: 'user',
    token: ''
  },
  form: {
    email: '',
    name: '',
    password: '',
    location: ''
  },
  error: {
    isError: false,
    message: ''
  }
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (_, thunkAPI) => {
    const input = thunkAPI.getState().user.form;
    try {
      const res = await axios.post(`api/users/new`,input);
      thunkAPI.dispatch(emptyForm());
      return res.data
    } catch (error) {
      return thunkAPI.rejectWIthValue(error.response.data.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (_, thunkAPI) => {
    const {email, password} = thunkAPI.getState().user.form;
    try {
      const res = await axios.post(`api/users/login`, { email,password});
      return res.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWIthValue(error.response.data.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateForm: (state, { payload: { name, value } }) => {
      state.form[name]=value
    },
    emptyForm: (state) => {
      state.form={
        email: '',
        name: '',
        password: '',
        location: ''
      }
    }
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
  },
  [registerUser.fulfilled]: (state,action) => {
      state.isLoading = false;
      state.error.isError = false;
      state.user = action.payload;
  },
  [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error.isError = true;
      state.error.message = action.payload
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
  },
  [loginUser.fulfilled]: (state,action) => {
      state.isLoading = false;
      state.error.isError = false;
      state.user = action.payload;
  },
  [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error.isError = true;
      state.error.message = action.payload
  }
  }
});

export const { updateForm, emptyForm } = userSlice.actions;
export default userSlice.reducer;
