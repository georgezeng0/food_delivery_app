import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getLocalUser = () => {
  const localUser = localStorage.getItem('user');
  if (localUser) {
    return JSON.parse(localUser)
  } else {
    return {
      email: '',
      name: '',
      location: '',
      group: '',
      token: ''
    }
  }
}

const initialState = {
  isLoading: false,
  user: getLocalUser(),
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

export const editUser = createAsyncThunk(
  'user/edit',
  async (_, thunkAPI) => {
    const input = thunkAPI.getState().user.form;
    
    try {
      const res = await axios.patch(`api/users/edit`,input);
      return res.data
    } catch (error) {
      console.log(error);
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
    },
    populateForm: (state) => {
      const { email, name, location } = state.user
      state.form = {
        ...state.form, email, name, location 
      }
    },
    setLocalUser: (state) => {
      localStorage.setItem('user',JSON.stringify(state.user))
    },
    logout: (state) => {
      state.user = {
        email: '',
        name: '',
        location: '',
        group: '',
        token: ''
      };
      localStorage.removeItem('user')
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
  },
  [editUser.pending]: (state) => {
      state.isLoading = true;
  },
  [editUser.fulfilled]: (state,action) => {
      state.isLoading = false;
      state.error.isError = false;
      state.user = { ...state.user, ...action.payload };
      state.form.password=""
    
  },
  [editUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error.isError = true;
      state.error.message = action.payload
  }
  }
});

export const {
  updateForm, emptyForm,
  setLocalUser, logout, populateForm
  } = userSlice.actions;
export default userSlice.reducer;
