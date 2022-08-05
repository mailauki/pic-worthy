import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/usersSlice';
import photoReducer from './features/photos/photosSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    photos: photoReducer
  }
})

export default store;
