import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
  // return a Promise containing the data we want
  return fetch("/users")
    .then((r) => r.json())
    .then((data) => data)
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [], // array of users
    status: "idle", // loading state
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
    [fetchUsers.pending](state) {
      state.status = "loading"
    },
    [fetchUsers.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions
export default usersSlice.reducer
