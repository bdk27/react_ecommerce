import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// 使用 import.meta.glob 動態導入圖片
const allImages = import.meta.glob("@/assets/images/**/*.jpg", {
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
          "模特兒身高：192 cm | 尺碼：L<br>Regular fit 標準版針織 T 恤；採用短纖人造絲混紡製成；圓領短袖；羅紋邊飾。",
      },
      {
        id: uuidv4(),
        name: "紋理 T 恤",
        price: 1190,
        images: getImages("t-shirts", "tshirts2"),
        color: "黑色 | 4087/400/800",
        description: [
          "模特兒身高：188 cm | 尺碼：L",
          "標準版 T 恤；圓領；短袖。",
        ],
        content: "材質和保養: 99% 聚酯纖維, 1% 彈性纖維",
      },
      {
        id: uuidv4(),
        name: "HEAVY WEIGHT 基本款 T 恤",
        price: 790,
        images: getImages("t-shirts", "tshirts3"),
        description: "Relaxed fit 休閒版 T 恤；採用精梳棉製成；圓領短袖。",
      },
      {
        id: uuidv4(),
        name: "重磅短袖 T 恤",
        price: 990,
        images: getImages("t-shirts", "tshirts4"),
        description:
          "標準版 T 恤；採用精梳棉製成；圓領；短袖。<br>Origins 特別系列。",
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
