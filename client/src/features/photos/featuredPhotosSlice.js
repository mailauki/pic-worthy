import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFeaturedPhotos = createAsyncThunk("photos/fetchFeaturedPhotos", () => {
  return fetch("/featured")
    .then((r) => r.json())
    .then((data) => data)
})

const featuredPhotosSlice = createSlice({
  name: 'photos',
  initialState: {
    entities: [],
    status: "idle"
  },
  reducers: {
    
  },
  extraReducers: {
    [fetchFeaturedPhotos.pending](state) {
      state.status = "loading"
    },
    [fetchFeaturedPhotos.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export default featuredPhotosSlice.reducer