import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data.body; 
      } else {
        return rejectWithValue(data.message || 'Erreur profil');
      }
    } catch (error) {
      return rejectWithValue('Erreur réseau');
    }
  }
);


export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  async ({ token, newUserName }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUserName }),
      });
      const data = await res.json();
      if (res.ok) return data.body.userName;
      return rejectWithValue(data.message);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: null,
    lastName: null,
    userName: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.userName = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const { firstName, lastName, userName } = action.payload;
        state.firstName = firstName;
        state.lastName = lastName;
        state.userName = userName;
        state.status = 'succeeded';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.userName = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
