import { configureStore } from '@reduxjs/toolkit';
import customerAuthReducer from './components/pages/Dashboard/slice/customerAuthSlice';
import adminAuthReducer from './components/pages/Admin/slice/adminAuthSlice';
import customerAccountReducer from './components/pages/Dashboard/slice/customerAccountSlice';

export default configureStore({
  reducer: {
    customerAuth: customerAuthReducer,
    adminAuth: adminAuthReducer,
    customerAccounts: customerAccountReducer,
  },
});
