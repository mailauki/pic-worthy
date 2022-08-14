import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSearch = createAsyncThunk("search/fetchSearch", ({tab: tab, keyword: keyword}) => {
  return fetch(`/${tab}/search/${keyword}`)
    .then((r) => r.json())
    .then((data) => data)
    // .then((r) => {
    //   if (r.ok) {
    //     r.json().then((data) => data)
    //   } else {
    //     r.json().then((err) => setErrors(err.errors))
    //   }
    // })
})

const searchSlice = createSlice({
  name: 'results',
  initialState: {
    entities: [], 
    status: "idle"
  },
  reducers: {
    // tagAdded(state, action) {
    //   state.entities.push(action.payload)
    // },
    // tagUpdated(state, action) {
    //   const tag = state.entities.find((tag) => tag.id === action.payload.id)
    //   tag.url = action.payload.url
    // },
    // tagDeleted(state, action) {
    //   const tag = state.entities.find((tag) => tag.id == action.payload.id)
    //   tag.url = action.payload.url
    // }
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

// export const { tagAdded, tagUpdated, tagDeleted } = searchSlice.actions
export default searchSlice.reducer