import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSearch = createAsyncThunk("search/fetchSearch", ({tab: tab, keyword: keyword}) => {
  return fetch(`/${tab}/search/${keyword}`)
    .then((r) => r.json())
    .then((data) => data)
})

const searchSlice = createSlice({
  name: 'results',
  initialState: {
    entities: [], 
    status: "idle"
  },
  reducers: {
  },
  extraReducers: {
    [fetchSearch.pending](state) {
      state.status = "loading"
    },
    [fetchSearch.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export default searchSlice.reducer