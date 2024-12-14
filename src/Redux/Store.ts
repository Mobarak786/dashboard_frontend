import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/UsersSlice";
import analyticsReducer from "./Slices/AnalyticsSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    analytics: analyticsReducer,
  },
});

// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
