import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';
import photoReducer from './features/photos/photosSlice';
import featuredPhotoReducer from './features/photos/featuredPhotosSlice';
import tagReducer from './features/tags/tagsSlice';
import searchReducer from './features/search/searchSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    photos: photoReducer,
    featuredPhotos: featuredPhotoReducer,
    tags: tagReducer,
    results: searchReducer
  }
})

export default store;
