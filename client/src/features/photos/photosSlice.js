import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", () => {
  return fetch("/photos")
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
    userAdded(state, action) {
      state.entities.push(action.payload)
    },
    userUpdated(state, action) {
      const photo = state.entities.find((photo) => photo.id === action.payload.id)
      photo.url = action.payload.url
    },
    userDeleted(state, action) {
      const photo = state.entities.find((photo) => photo.id == action.payload.id)
      photo.url = action.payload.url
    }
  },
  extraReducers: {
    [fetchPhotos.pending](state) {
      state.status = "loading"
    },
    [fetchPhotos.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const { photoAdded, photoUpdated, photoDeleted } = photosSlice.actions
export default photosSlice.reducer