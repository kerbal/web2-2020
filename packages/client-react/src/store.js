import { configureStore } from '@reduxjs/toolkit';
import customerAuthReducer from './components/pages/Dashboard/slice/customerAuthSlice';
import customerAccountReducer from './components/pages/Dashboard/slice/customerAccountSlice';

export default configureStore({
  reducer: {
    customerAuth: customerAuthReducer,
    customerAccounts: customerAccountReducer,
  },
});
