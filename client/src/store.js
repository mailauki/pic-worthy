import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';
import photoReducer from './features/photos/photosSlice';
import featuredPhotoReducer from './features/photos/featuredPhotosSlice';
import tagReducer from './features/tags/tagsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    photos: photoReducer,
    featuredPhotos: featuredPhotoReducer,
    tags: tagReducer
  }
})

export default store;
