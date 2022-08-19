import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
    [fetchUser.pending](state) {
      state.status = "loading"
    },
    [fetchUser.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const { followAdded, followDeleted } = usersSlice.actions
export default usersSlice.reducer
