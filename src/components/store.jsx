import { configureStore } from '@reduxjs/toolkit';
import ibgeReducer from './Slice';

export const store = configureStore({
  reducer: {
    ibge: ibgeReducer, 
  },
});