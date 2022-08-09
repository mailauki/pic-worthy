import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", () => {
  return fetch("/me")
    .then((r) => r.json())
    .then((data) => data)
})

const currentUserSlice = createSlice({
  name: 'currentUser',
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
    [fetchCurrentUser.pending](state) {
      state.status = "loading"
    },
    [fetchCurrentUser.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const { userAdded, userUpdated, userDeleted } = currentUserSlice.actions
export default currentUserSlice.reducer