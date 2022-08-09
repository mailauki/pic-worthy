import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
  return fetch("/users")
    .then((r) => r.json())
    .then((data) => data)
})

export const fetchUser = createAsyncThunk("users/fetchUser", (id) => {
  return fetch(`/users/${id}`)
    .then((r) => r.json())
    .then((data) => data)
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
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
    [fetchUsers.pending](state) {
      state.status = "loading"
    },
    [fetchUsers.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    },
    [fetchUser.pending](state) {
      state.status = "loading"
    },
    [fetchUser.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions
export default usersSlice.reducer
