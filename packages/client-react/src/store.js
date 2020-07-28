import { configureStore } from '@reduxjs/toolkit';
import customerAuthReducer from './components/pages/Landing/slice/customerAuthSlice';

export default configureStore({
  reducer: {
    customerAuth: customerAuthReducer,
  },
});
