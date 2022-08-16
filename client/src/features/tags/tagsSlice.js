import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTags = createAsyncThunk("tags/fetchTags", () => {
  return fetch("/tags")
    .then((r) => r.json())
    .then((data) => data)
})

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    entities: [], 
    status: "idle"
  },
  reducers: {
    tagAdded(state, action) {
      state.entities.push(action.payload)
    }
  },
  extraReducers: {
    [fetchTags.pending](state) {
      state.status = "loading"
    },
    [fetchTags.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const { tagAdded } = tagsSlice.actions
export default tagsSlice.reducer