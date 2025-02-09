import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: "TShirts",
      name: "T恤",
      link: "/products/t-shirts",
    },
    {
      id: "Polos",
      name: "POLO 衫",
      link: "/products/polos",
    },
    {
      id: "Jackets",
      name: "外套夾克",
      link: "/products/jackets",
    },
    {
      id: "Knitwear",
      name: "針織衫/毛衣",
      link: "/products/knitwear",
    },
    {
      id: "Shirts",
      name: "襯衫",
      link: "/products/shirts",
    },
    {
      id: "Shorts",
      name: "短褲",
      link: "/products/shorts",
    },
    {
      id: "Jeans",
      name: "牛仔褲",
      link: "/products/jeans",
    },
    {
      id: "Casual",
      name: "休閒褲",
      link: "/products/casual",
    },
    {
      id: "Suits",
      name: "西裝外套",
      link: "/products/suits",
    },
  ],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // 如果你未來需要對 categories 做增刪改，可以在這裡加相應的 reducers
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
  },
});

// 若需要導出 actions，就在這裡解構
export const { addCategory } = categorySlice.actions;

// 預設匯出 reducer 給 store 使用
export default categorySlice.reducer;
