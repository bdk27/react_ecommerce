import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/firebase-config"; // 請確認 firebase-config.js 的路徑正確
import { collection, getDocs } from "firebase/firestore";

// 非同步 thunk，從 Firestore 抓取所有分類的產品資料
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);
    // 建立一個物件，把每個分類的資料存進去
    const productsData = {};
    querySnapshot.forEach((doc) => {
      // 假設文件內容結構為 { products: [ ... ] }
      productsData[doc.id] = doc.data().products;
    });
    return productsData;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {}, // 從 Firestore 抓取後，products 會是一個分類對應陣列的物件
    loading: false,
    error: null,
  },
  reducers: {
    // 若需要其他同步操作，可在這裡定義 reducer
    addProduct: (state, action) => {
      const { category, product } = action.payload;
      // 如果該分類已存在則 push，新分類則建立陣列
      if (state.products[category]) {
        state.products[category].push(product);
      } else {
        state.products[category] = [product];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
