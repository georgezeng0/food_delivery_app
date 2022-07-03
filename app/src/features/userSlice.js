import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getLocalUser = () => {
  const localUser = localStorage.getItem('user');
  if (localUser) {
    const user = JSON.parse(localUser)
    if (user.expires <= Date.now()) {
      return {
        email: '',
        name: '',
        location: '',
        group: '',
        token: '',
        expires: '',
      }
    } else {
      return user
    } 
  } else {
    return {
      email: '',
      name: '',
      location: '',
      group: '',
      token: '',
      expires: '',
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
  success: false,
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
      return thunkAPI.rejectWithValue(error.response.data.message || error.response.data)
      // Error.response.data to catch any messages not manually set
    }
  }
)

export const editUser = createAsyncThunk(
  'user/edit',
  async (_, thunkAPI) => {
    const input = thunkAPI.getState().user.form;
    
    try {
      const res = await axios.patch(`api/users/edit`, input);
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message||error.response.data)
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
      return thunkAPI.rejectWithValue(error.response.data.message||error.response.data)
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
    },
    resetSuccess: state => {
      state.success = false;
    }
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.error.isError = false;
      state.isLoading = true;
  },
  [registerUser.fulfilled]: (state,action) => {
      state.isLoading = false;
      state.error.isError = false;
    state.user = action.payload;
    state.success=true
  },
  [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error.isError = true;
      state.error.message = action.payload
  },
  [loginUser.pending]: (state) => {
    state.isLoading = true;
    state.error.isError = false;
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
      state.error.isError = false;
      state.isLoading = true;
      state.success = false;
  },
  [editUser.fulfilled]: (state,action) => {
      state.isLoading = false;
      state.error.isError = false;
      state.user = { ...state.user, ...action.payload };
      state.form.password=""
      state.success = true;
  },
  [editUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error.isError = true;
      state.error.message = action.payload
  }
  }
});

export const {
  updateForm, emptyForm, resetSuccess,
  setLocalUser, logout, populateForm
  } = userSlice.actions;
export default userSlice.reducer;
