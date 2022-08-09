import { createSlice } from '@reduxjs/toolkit';

const selectedTagsSlice = createSlice({
  name: 'selectedTags',
  initialState: {
    entities: []
  },
  reducers: {
    selectedTagAdded(state, action) {
      state.entities.push(action.payload)
    },
    selectedTagUpdated(state, action) {
      const tag = state.entities.find((tag) => tag.id === action.payload.id)
      tag.name = action.payload.name
    },
    selectedTagDeleted(state, action) {
      // const tag = state.entities.find((tag) => tag === action.payload)
      // console.log(`delete reducer ${tag}`)
      const index = state.entities.findIndex((tag) => tag.id === action.payload)
      state.entities.splice(index, 1)
    }
  }
})

export const { selectedTagAdded, selectedTagUpdated, selectedTagDeleted } = selectedTagsSlice.actions
export default selectedTagsSlice.reducer