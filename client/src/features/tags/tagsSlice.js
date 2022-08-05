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
    },
    tagUpdated(state, action) {
      const tag = state.entities.find((tag) => tag.id === action.payload.id)
      tag.url = action.payload.url
    },
    tagDeleted(state, action) {
      const tag = state.entities.find((tag) => tag.id == action.payload.id)
      tag.url = action.payload.url
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

export const { tagAdded, tagUpdated, tagDeleted } = tagsSlice.actions
export default tagsSlice.reducer