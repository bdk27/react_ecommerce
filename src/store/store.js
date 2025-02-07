import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/data/categorySlice.js";
import productReducer from "@/data/productSlice.js";
import cartReducer from "@/data/cartSlice.js";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
