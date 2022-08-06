import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import photoReducer from './features/photos/photosSlice';
import tagReducer from './features/tags/tagsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    photos: photoReducer,
    tags: tagReducer
  }
})

export default store;
