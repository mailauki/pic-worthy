import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk("users/fetchUser", (id) => {
  // return a Promise containing the data we want
  return fetch(`/users/${id}`)
    .then((r) => r.json())
    .then((data) => data)
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    entities: {},
    status: "idle"
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload)
    },
    userUpdated(state, action) {
      const user = state.entities.find((user) => user.id === action.payload.id)
      user.url = action.payload.url
    },
    userDeleted(state, action) {
      const user = state.entities.find((user) => user.id == action.payload.id)
      user.url = action.payload.url
    }
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchUser.pending](state) {
      state.status = "loading"
    },
    [fetchUser.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const { userAdded, userUpdated, userDeleted } = userSlice.actions
export default userSlice.reducer