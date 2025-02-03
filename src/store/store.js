import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/data/categorySlice.js";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

export default store;
