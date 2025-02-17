import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          immutableCheck: false, // Disable immutability checks
          serializableCheck: false, // Optional: Disable serializability checks
        }),
    
    
    
    });

export default store;