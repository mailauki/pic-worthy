import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", () => {
  return fetch("/photos")
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
    photoAdded(state, action) {
      state.entities.push(action.payload)
    },
    photoUpdated(state, action) {
      const photo = state.entities.find((photo) => photo.id === action.payload.id)
      photo.image = action.payload.image
      photo.description = action.payload.description
    },
    photoDeleted(state, action) {
      const index = state.entities.findIndex((photo) => photo.id === action.payload)
      state.entities.splice(index, 1)
    },
    likeAdded(state, action) {
      const photo = state.entities
      photo.likes_total = photo.likes_total + 1
    },
    likeDeleted(state, action) {
      const photo = state.entities
      photo.likes_total = photo.likes_total - 1
    }
  },
  extraReducers: {
    [fetchPhotos.pending](state) {
      state.status = "loading"
    },
    [fetchPhotos.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    },
    [fetchPhoto.pending](state) {
      state.status = "loading"
    },
    [fetchPhoto.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const { photoAdded, photoUpdated, photoDeleted, likeAdded, likeDeleted } = photosSlice.actions
export default photosSlice.reducer