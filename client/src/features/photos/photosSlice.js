import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMostRecentPhotos = createAsyncThunk("photos/fetchMostRecentPhotos", () => {
  return fetch("/most_recent")
    .then((r) => r.json())
    .then((data) => data)
})

export const fetchPhoto = createAsyncThunk("photos/fetchPhoto", (id) => {
  return fetch(`/photos/${id}`)
    .then((r) => r.json())
    .then((data) => data)
})

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    entities: [],
    status: "idle"
  },
  reducers: {
    likeAdded(state) {
      const photo = state.entities
      photo.likes_total = photo.likes_total + 1
    },
    likeDeleted(state) {
      const photo = state.entities
      photo.likes_total = photo.likes_total - 1
    },
    commentAdded(state, action) {
      const photo = state.entities
      photo.comments.push(action.payload)
    },
    commentDeleted(state, action) {
      const photo = state.entities
      const index = photo.comments.findIndex((comment) => comment.id === action.payload)
      photo.comments.splice(index, 1)
    }
  },
  extraReducers: {
    [fetchPhoto.pending](state) {
      state.status = "loading"
    },
    [fetchPhoto.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    },
    [fetchMostRecentPhotos.pending](state) {
      state.status = "loading"
    },
    [fetchMostRecentPhotos.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const { likeAdded, likeDeleted, commentAdded, commentDeleted } = photosSlice.actions
export default photosSlice.reducer