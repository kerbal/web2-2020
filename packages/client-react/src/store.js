import { configureStore } from '@reduxjs/toolkit';
import customerAuthReducer from './components/pages/Dashboard/slice/customerAuthSlice';
import adminAuthReducer from './components/pages/Admin/slice/adminAuthSlice';

export default configureStore({
  reducer: {
    customerAuth: customerAuthReducer,
    adminAuth: adminAuthReducer,
  },
});
