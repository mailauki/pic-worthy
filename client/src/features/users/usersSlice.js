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
    // userDeleted(state, action) {
    //   const user = state.entities.find((user) => user.id == action.payload.id)
    //   user.url = action.payload.url
    // },
    followAdded(state, action) {
      const user = state.entities
      user.followers_total = user.followers_total + 1
    },
    followDeleted(state, action) {
      const user = state.entities
      user.followers_total = user.followers_total - 1
    }
  },
  extraReducers: {
    // [fetchUsers.pending](state) {
    //   state.status = "loading"
    // },
    // [fetchUsers.fulfilled](state, action) {
    //   state.entities = action.payload
    //   state.status = "idle"
    // },
    [fetchUser.pending](state) {
      state.status = "loading"
    },
    [fetchUser.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const { userDeleted, followAdded, followDeleted } = usersSlice.actions
export default usersSlice.reducer
