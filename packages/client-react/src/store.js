import { configureStore } from '@reduxjs/toolkit';
import customerAuthReducer from './components/pages/Dashboard/slice/customerAuthSlice';

export default configureStore({
  reducer: {
    customerAuth: customerAuthReducer,
  },
});
