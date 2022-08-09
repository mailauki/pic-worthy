import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './features/users/currentUserSlice';
import usersReducer from './features/users/usersSlice';
import photoReducer from './features/photos/photosSlice';
import tagReducer from './features/tags/tagsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    photos: photoReducer,
    tags: tagReducer
  }
})

export default store;
