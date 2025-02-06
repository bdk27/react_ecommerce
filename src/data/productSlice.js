import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// 使用 import.meta.glob 動態導入圖片
const allImages = import.meta.glob("@/assets/images/t-shirts/**/*.jpg", {
  eager: true,
});
function getImages(category, folderName, count = 5) {
  return Array.from({ length: count }, (_, i) => {
    const path = `/src/assets/images/${category}/${folderName}/${folderName}-${
      i + 1
    }.jpg`;
    return allImages[path]?.default || allImages[path];
  });
}

const initialState = {
  products: {
    TShirts: [
      {
        id: uuidv4(),
        name: "飄逸針織 T 恤",
        price: 1190,
        images: getImages("t-shirts", "tshirts1"),
        description:
          "模特兒身高：192 cm | 尺碼：L\nRegular fit 標準版針織 T 恤；採用短纖人造絲混紡製成；圓領短袖；羅紋邊飾。",
      },
      {
        id: uuidv4(),
        name: "飄逸針織 T 恤",
        price: 1190,
        images: getImages("t-shirts", "tshirts2"),
        description:
          "模特兒身高：192 cm | 尺碼：L\nRegular fit 標準版針織 T 恤；採用短纖人造絲混紡製成；圓領短袖；羅紋邊飾。",
      },
      {
        id: uuidv4(),
        name: "飄逸針織 T 恤",
        price: 1190,
        images: getImages("t-shirts", "tshirts3"),
        description:
          "模特兒身高：192 cm | 尺碼：L\nRegular fit 標準版針織 T 恤；採用短纖人造絲混紡製成；圓領短袖；羅紋邊飾。",
      },
      {
        id: uuidv4(),
        name: "飄逸針織 T 恤",
        price: 1190,
        images: getImages("t-shirts", "tshirts4"),
        description:
          "模特兒身高：192 cm | 尺碼：L\nRegular fit 標準版針織 T 恤；採用短纖人造絲混紡製成；圓領短袖；羅紋邊飾。",
      },
    ],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { category, product } = action.payload;
      state.products[category].push(product);
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
