import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './features/users/currentUserSlice';
import usersReducer from './features/users/usersSlice';
import photoReducer from './features/photos/photosSlice';
import tagReducer from './features/tags/tagsSlice';
import selectedTagReducer from './features/tags/selectedTagsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    photos: photoReducer,
    tags: tagReducer,
    selectedTags: selectedTagReducer
  }
})

export default store;
