import { configureStore } from '@reduxjs/toolkit';
import drugReducer from '../features/drugs/drugSlice';

export const store = configureStore({
  reducer: {
    drugs: drugReducer,
  },
});