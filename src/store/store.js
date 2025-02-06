import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/data/categorySlice.js";
import productReducer from "@/data/productSlice.js";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
  },
});

export default store;
