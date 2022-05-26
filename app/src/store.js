import { configureStore } from '@reduxjs/toolkit';
import basketSlice from './features/basketSlice';
import restaurantSlice from './features/restaurantSlice';
import reviewSlice from './features/reviewSlice';
import userSlice from './features/userSlice';

export const store = configureStore({
    reducer: {
        restaurant: restaurantSlice,
        basket: basketSlice,
        review: reviewSlice,
        user: userSlice
  },
});
