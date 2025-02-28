// uploadProducts.js
import { db } from "../src/firebase-config.js"; // 調整路徑，確保可以正確匯入 Firebase 初始化的 db
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function getImages(category, folderName, count = 5) {
  return Array.from({ length: count }, (_, i) => {
    return `/react_ecommerce/images/${category}/${folderName}/${folderName}-${
      i + 1
    }.jpg`;
  });
}

// 定義所有產品資料，結構為各分類對應一個陣列
const productsData = {
  TShirts: [
    {
      id: uuidv4(),
      name: "飄逸針織 T 恤",
      price: 1190,
      images: getImages("t-shirts", "tshirts1"),
      color: "黑色 | 0304/406/800",
      description: [
        "模特兒身高：192 cm | 尺碼：L",
        "Regular fit 標準版針織 T 恤；採用短纖人造絲混紡製成；圓領短袖；羅紋邊飾。",
      ],
      content: "材質和保養: 82%嫘縈, 18%聚醯胺纖維",
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
      content: "材質和保養: 99%聚酯纖維, 1%彈性纖維",
    },
    {
      id: uuidv4(),
      name: "HEAVY WEIGHT 基本款 T 恤",
      price: 790,
      images: getImages("t-shirts", "tshirts3"),
      color: "黑色 | 1887/455/800",
      description: ["Relaxed fit 休閒版 T 恤；採用精梳棉製成；圓領短袖。"],
      content: "材質和保養: 100%棉",
    },
    {
      id: uuidv4(),
      name: "重磅短袖 T 恤",
      price: 990,
      images: getImages("t-shirts", "tshirts4"),
      color: "黑色 | 0761/323/800",
      description: [
        "標準版 T 恤；採用精梳棉製成；圓領；短袖。",
        "Origins 特別系列。",
      ],
      content: "材質和保養: 100%棉",
    },
    {
      id: uuidv4(),
      name: "基本款 V 領 T 恤",
      price: 490,
      images: getImages("t-shirts", "tshirts5"),
      color: "黑色 | 5584/362/800",
      description: ["修身版彈性棉質 T 恤；V 領；短袖。"],
      content: "材質和保養: 95% 棉, 5% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "褪色針織 T 恤",
      price: 1190,
      images: getImages("t-shirts", "tshirts6"),
      color: "黑色 | 4805/441/800",
      description: [
        "Relaxed fit 休閒版褪色 T 恤；採用短纖棉質布料製成；圓領；短袖；不規則邊飾。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "人造絲-羊毛 T 恤",
      price: 1290,
      images: getImages("t-shirts", "tshirts7"),
      color: "黑色 | 0722/448/800",
      description: [
        "Relaxed fit 休閒版 T 恤；採用人造絲和羊毛混紡製成；高領；長袖。",
      ],
      content: "材質和保養: 70% 再生纖維素 纖維, 30% 羊毛",
    },
    {
      id: uuidv4(),
      name: "橡膠化文字 T 恤 - LIMITED EDITION",
      price: 990,
      images: getImages("t-shirts", "tshirts8"),
      color: "黑色 | 0722/448/800",
      description: ["Boxy fit 方版 T 恤；圓領；短袖；正面和背面印有撞色標語。"],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "撞色印花 T 恤",
      price: 990,
      images: getImages("t-shirts", "tshirts9"),
      color: "黑色 | 0495/410/800",
      description: [
        "Relaxed fit 休閒版 T 恤；圓領；短袖；正面和背面印有撞色圖案。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "AMERICAN FOOTBALL 設計 T 恤",
      price: 1990,
      images: getImages("t-shirts", "tshirts10"),
      color: "黑色 | 4161/403/800",
      description: [
        "Relaxed fit 休閒版 T 恤；採用輕質紋理科技布料製成。",
        "Zara Athleticz。",
      ],
      content: "97% 聚酯纖維 3% 彈性纖維",
    },
  ],
  Polos: [
    {
      id: uuidv4(),
      name: "RELAXED FIT 休閒版針織 POLO 衫",
      price: 1790,
      images: getImages("polos", "polos1"),
      color: "黑色 | 4216/405/800",
      description: [
        "休閒版針織POLO衫；採用短纖棉質布料製成。 領口；正面紐扣閉合。",
        "長袖。 羅紋邊飾。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "紋理 POLO 衫",
      price: 1190,
      images: getImages("polos", "polos2"),
      color: "黑色 | 4092/400/800",
      description: ["Regular fit 標準版翻領 POLO 衫；正面開衩；短袖。"],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "四分之一拉鍊針織 POLO 衫",
      price: 1790,
      images: getImages("polos", "polos3"),
      color: "黑色 | 6674/410/800",
      description: [
        "Regular fit 標準版標準領 POLO 衫；採用短纖人造絲混紡製成；正面拉鍊閉合；長袖；羅紋邊飾。",
      ],
      content: "材質和保養: 60% 嫘縈, 22% 聚酯纖維, 18% 聚醯胺纖維",
    },
    {
      id: uuidv4(),
      name: "人造絲混紡針織 POLO 衫",
      price: 1290,
      images: getImages("polos", "polos4"),
      color: "黑色 | 0304/407/800",
      description: [
        "標準領針織 POLO 衫；採用短纖人造絲混紡製成；前襟配單排鈕扣；短袖；側襬開叉；羅紋邊飾。",
      ],
      content: "材質和保養: 82% 嫘縈, 18% 聚醯胺纖維",
    },
    {
      id: uuidv4(),
      name: "人造絲混紡針織 POLO 衫",
      price: 1490,
      images: getImages("polos", "polos5"),
      color: "黑色 | 5536/310/800",
      description: [
        "模特兒身高：188 cm | 尺碼：L",
        "針織標準領 POLO 衫；採用短纖人造絲混紡製成；正面紐扣閉合；長袖；側襬開叉；羅紋邊飾。",
      ],
      content: "材質和保養: 51% 嫘縈, 29% 聚酯纖維, 20% 聚醯胺纖維",
    },
    {
      id: uuidv4(),
      name: "拉鍊鎖邊馬球衫",
      price: 1490,
      images: getImages("polos", "polos6"),
      color: "黑色 | 4087/308/800",
      description: [
        "模特兒身高：188 cm | 尺碼：L",
        "Regular fit 標準版標準領 POLO 衫；採用彈性棉質製成；正面拉鍊閉合；長袖；羅紋邊飾。",
      ],
      content: "材質和保養: 84% 棉, 16% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "垂直 JACQUARD 提花 POLO 衫",
      price: 1490,
      images: getImages("polos", "polos7"),
      color: "黑色 | 7380/854/800",
      description: [
        "Relaxed fit 休閒版 POLO 衫；採用豎向紋理布料製成；正面開叉翻領；短袖。",
      ],
      content: "88% 聚醯胺纖維 12% 彈性纖維",
    },
  ],
  Jackets: [
    {
      id: uuidv4(),
      name: "同色系標準領外套",
      price: 2490,
      images: getImages("jackets", "jackets1"),
      color: "黑色 | 6987/411/800",
      description: [
        "休閒版棉質外套；略帶絎縫內層。 撞色領；綴按扣袖口長袖；側貼袋；褪色效果；前襟配拉鍊。",
      ],
      content: "材質 100% 棉, 襯裡 100% 棉, 填充物 100% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "褪色人造皮革飛行員外套",
      price: 1990,
      images: getImages("jackets", "jackets2"),
      color: "黑色 | 5320/305/031",
      description: [
        "短版翻領外套；採用真皮效果布料製成。 繫扣袖口長袖；嵌線側口袋；一個內袋；褪色效果；前襟配按扣閉合。",
      ],
      content: "材質 面料底 100% 聚酯纖維, 塗層 100% 聚氨基甲酸酯纖維",
    },
    {
      id: uuidv4(),
      name: "條紋羊毛混紡夾克",
      price: 3490,
      images: getImages("jackets", "jackets3"),
      color: "黑色 | 8491/410/800",
      description: [
        "休閒版翻領外套；採用羊毛混紡製成。 綴按扣袖口長袖；一個胸口袋；嵌線側口袋；前襟配拉鍊。",
      ],
      content:
        "材質 50% 羊毛, 43% 聚酯纖維, 4% 聚醯胺纖維, 3% 其他纖維, 襯裡 100% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "人造皮革外套",
      price: 2990,
      images: getImages("jackets", "jackets4"),
      color: "黑色 | 3046/404/800",
      description: [
        "Relaxed fit 休閒版標準領外套；採用人造皮布料製成；長袖；嵌線側口袋；鬆緊帶邊飾；前襟配拉鍊。",
      ],
      content:
        "材質 次要面料 100% 聚酯纖維, 面料底 8% 棉, 72% 嫘縈, 5% 金屬纖維, 15% 聚酯纖維 塗層 100% 聚氨基甲酸酯纖維 襯裡 全身 80% 聚酯纖維, 20% 棉, 袖 100% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "口袋飾真皮外套",
      price: 8990,
      images: getImages("jackets", "jackets5"),
      color: "黑色 | 5479/100/800",
      description: [
        "短版真皮夾克；高領；繫扣袖口長袖；胸貼袋；配內袋；前襟配拉鍊。",
      ],
      content: "材質 100% 牛皮 襯裡 100% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "拼接真皮牛仔外套",
      price: 4990,
      images: getImages("jackets", "jackets6"),
      color: "黑色 | 4720/427/800",
      description: [
        "Relaxed fit 休閒版翻領外套；採用拼接真皮和牛仔布製成；繫扣袖口長袖；側貼袋；前襟配單排鈕扣。",
      ],
      content: "材質 次要面料 100% 棉 主要材料 100% 牛皮 襯裡 100% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "基本款牛仔外套",
      price: 1490,
      images: getImages("jackets", "jackets7"),
      color: "黑色 | 1538/405/800",
      description: [
        "模特兒身高：185 cm | 尺碼：M",
        "Regular fit 標準版標準領外套；採用棉質牛仔布製成；繫扣袖口長袖；翻蓋胸口袋；嵌線側口袋；褪色效果；前襟配單排鈕扣。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "人造皮革騎士風外套",
      price: 2790,
      images: getImages("jackets", "jackets8"),
      color: "黑色 | 8491/400/800",
      description: [
        "人造皮革布料外套；標準翻領；拉鍊袖口長袖；拉鍊前口袋；一個內袋；不對稱拉鍊閉合。",
      ],
      content: "100% 聚酯纖維 100% 聚氨基甲酸酯纖維",
    },
    {
      id: uuidv4(),
      name: "人造麂皮外套",
      price: 2490,
      images: getImages("jackets", "jackets9"),
      color: "黑色 | 1437/405/800",
      description: [
        "休閒版翻領外套；彈性袖口長袖。 嵌線側口袋。 前襟隱藏式按扣閉合。",
      ],
      content: "95% 聚酯纖維 5% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "縫邊牛仔襯衫式外套",
      price: 3490,
      images: getImages("jackets", "jackets10"),
      color: "黑色 | 7380/403/800",
      description: [
        "Relaxed fit 休閒版襯衫式外套；未洗牛仔布製成；初次穿著時較爲硬挺，隨著使用時間逐漸軟化。",
        "標準領；繫扣袖口長袖；蓋式前貼袋；前襟配隱藏式鈕扣。",
      ],
      content: "材質和保養: 100% 棉",
    },
  ],
  Knitwear: [
    {
      id: uuidv4(),
      name: "拉鍊開襟衫",
      price: 1990,
      images: getImages("knitwear", "knitwear1"),
      color: "黑色 | 3920/421/800",
      description: [
        "標準版針織開襟衫；採用短纖棉質混紡製成。 高領；長袖；嵌線側口袋；羅紋邊飾；前襟配拉鍊。",
      ],
      content: "材質和保養: 54% 聚醯胺纖維, 46% 棉",
    },
    {
      id: uuidv4(),
      name: "褪色針織 T 恤",
      price: 1190,
      images: getImages("knitwear", "knitwear2"),
      color: "黑色 | 4805/441/800",
      description: [
        "休閒版褪色T恤；採用短纖棉質布料製成。 圓領；短袖；不規則邊飾。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "方版剪裁針織衫",
      price: 1190,
      images: getImages("knitwear", "knitwear3"),
      color: "黑色 | 3166/412/800",
      description: ["方版針織衫；由緊湊紋理布料製成。 圓領長袖；羅紋邊飾。"],
      content: "材質和保養: 97% 棉, 3% 聚醯胺纖維",
    },
    {
      id: uuidv4(),
      name: "開襟衫",
      price: 1490,
      images: getImages("knitwear", "knitwear4"),
      color: "黑色 | 9598/370/800",
      description: ["Relaxed fit 休閒版開襟衫；長袖；羅紋邊飾。"],
      content: "材質和保養: 52% ,嫘縈 29% 聚酯纖維, 19% 聚醯胺纖維",
    },
    {
      id: uuidv4(),
      name: "紋理棉開襟衫",
      price: 1990,
      images: getImages("knitwear", "knitwear5"),
      color: "黑色 | 4216/403/800",
      description: [
        "Relaxed fit 休閒版開襟衫；採用短纖棉質布料製成；羅紋邊飾長袖；正面排扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "高領拉鍊針織衫",
      price: 1790,
      images: getImages("knitwear", "knitwear6"),
      color: "黑色 | 3284/404/800",
      description: [
        "Regular fit 標準版針織衫；採用短纖棉質布料製成；高領；前襟配拉鍊；長袖；羅紋邊飾。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "絲質棉針織衫",
      price: 1990,
      images: getImages("knitwear", "knitwear7"),
      color: "黑色 | 0077/411/800",
      description: [
        "Regular fit 標準版針織衫；採用短纖棉質和絲質混紡製成；圓領長袖；羅紋邊飾。",
      ],
      content: "材質和保養: 70% 棉, 30% 桑蠶絲",
    },
    {
      id: uuidv4(),
      name: "絲光羊毛針織衫",
      price: 1990,
      images: getImages("knitwear", "knitwear8"),
      color: "黑色 | 0077/411/800",
      description: [
        "Relaxed fit 休閒版針織衫；採用絲光外層短纖羊毛製成；圓領長袖；羅紋邊飾。",
      ],
      content: "材質和保養: 100% 羊毛",
    },
    {
      id: uuidv4(),
      name: "四分之一拉鍊針織衫",
      price: 1990,
      images: getImages("knitwear", "knitwear9"),
      color: "黑色 | 0077/411/800",
      description: [
        "模特兒身高：187 cm | 尺碼：L",
        "Regular fit 標準版針織衫；採用短纖人造絲混紡製成；高領；前襟配拉鍊；長袖；羅紋邊飾。",
      ],
      content: "材質和保養: 60% 嫘縈, 22% 聚酯纖維, 18% 聚醯胺纖維",
    },
    {
      id: uuidv4(),
      name: "拉鍊領口棉質針織衫",
      price: 1990,
      images: getImages("knitwear", "knitwear10"),
      color: "黑色 | 6674/402/800",
      description: [
        "模特兒身高：188 cm | 尺碼：L",
        "Regular fit 標準版短纖棉質拉鍊針織衫；長袖；羅紋邊飾。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "RELAXED FIT 休閒版開襟衫",
      price: 1990,
      images: getImages("knitwear", "knitwear11"),
      color: "黑色 | 5344/400/800",
      description: [
        "Relaxed fit 休閒版開襟衫；V 領；長袖；嵌線側口袋；羅紋邊飾。",
      ],
      content: "全身 100% 聚酯纖維 襯裡 100% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "紋理開襟衫",
      price: 2290,
      images: getImages("knitwear", "knitwear12"),
      color: "黑色 | 5755/405/800",
      description: [
        "Regular fit 標準版開襟衫；採用紋理短纖布料製成；圓領長袖；羅紋邊飾；正面排扣閉合。",
      ],
      content:
        "材質和保養: 39% 聚醯胺纖維, 33% 羊毛, 25% 阿爾帕卡毛, 3% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "RELAXED FIT 休閒版針織襯衫",
      price: 1990,
      images: getImages("knitwear", "knitwear13"),
      color: "黑色 | 4216/404/800",
      description: [
        "Relaxed fit 休閒版標準領針織襯衫；採用短纖棉質布料製成；羅紋邊飾長袖；正面排扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "人造絲混紡紋理開襟衫",
      price: 1990,
      images: getImages("knitwear", "knitwear14"),
      color: "黑色 | 6674/414/800",
      description: [
        "模特兒身高：188 cm | 尺碼：L",
        "Relaxed fit 休閒版翻領開襟衫；採用短纖人造絲混紡製成；羅紋邊飾長袖；正面排扣閉合。",
      ],
      content: "材質和保養: 60% 嫘縈, 22% 聚酯纖維, 18% 聚醯胺纖維",
    },
    {
      id: uuidv4(),
      name: "羊毛開襟衫",
      price: 2490,
      images: getImages("knitwear", "knitwear15"),
      color: "黑色 | 2142/401/800",
      description: [
        "Regular fit 標準版翻領開襟衫；採用短纖羊毛和棉質混紡製成；羅紋邊飾長袖；正面排扣閉合。",
      ],
      content: "材質和保養: 57% 棉, 30% 羊毛, 13% 聚醯胺纖維",
    },
  ],
  Shorts: [
    {
      id: uuidv4(),
      name: "基本款運動短褲",
      price: 990,
      images: getImages("shorts", "shorts1"),
      color: "黑色 | 1943/401/800",
      description: ["運動短褲；科技輕質彈性布料製成。", "Zara Athleticz。"],
      content: "材質 86% 聚酯纖維, 14% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "運動短褲",
      price: 1290,
      images: getImages("shorts", "shorts2"),
      color: "黑色 | 1943/400/807",
      description: [
        "運動短褲；採用輕質彈性科技布料製成；防撕裂紋理。",
        "Zara Athleticz。",
      ],
      content: "材質 主要面料 91% 聚酯纖維, 9% 彈性纖維 次要面料 100% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "RELAXED FIT 休閒版短褲",
      price: 1290,
      images: getImages("shorts", "shorts3"),
      color: "黑色 | 1943/400/807",
      description: [
        "模特兒身高：187 cm | 尺碼：M",
        "Relaxed fit 休閒版棉質短褲；鬆緊帶腰身配可調式內側抽繩；前口袋；後貼袋。",
      ],
      content: "材質和保養: 98%棉, 2%彈性纖維",
    },
    {
      id: uuidv4(),
      name: "工裝風牛仔短褲",
      price: 1490,
      images: getImages("shorts", "shorts4"),
      color: "黑色 | 4806/418/800",
      description: [
        "模特兒身高：185 cm | 尺碼：M",
        "Relaxed fit 休閒版短褲；採用棉質牛仔布製成；五口袋設計；腿部翻蓋貼袋；褪色效果；拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "紋理紡織短褲",
      price: 1290,
      images: getImages("shorts", "shorts5"),
      color: "黑色 | 4087/401/800",
      description: [
        "模特兒身高：188 cm | 尺碼：L",
        "棉質短褲。 可調式彈性腰身配抽繩。 前口袋；後貼袋。",
      ],
      content: "材質和保養: 99% 聚酯纖維, 1% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "運動風紋理短褲",
      price: 1290,
      images: getImages("shorts", "shorts6"),
      color: "黑色 | 3992/406/800",
      description: [
        "Relaxed-fit 休閒版短褲；可調式鬆緊帶腰身配抽繩；前口袋和後貼袋細節。",
      ],
      content: "材質和保養: 56% 聚酯纖維, 44% 棉",
    },
    {
      id: uuidv4(),
      name: "可調式束帶 RELAXED FIT 休閒版百慕達短褲",
      price: 1790,
      images: getImages("shorts", "shorts7"),
      color: "黑色 | 9621/852/800",
      description: [
        "Relaxed fit 休閒版短褲。 可調式腰帶；配龍蝦扣；正面打褶；前口袋和後貼袋；正面拉鍊和隱藏式金屬鉤扣閉合。",
      ],
      content: "材質和保養: 66% 聚酯纖維, 33% 嫘縈, 1% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "2 合 1 運動短褲",
      price: 1290,
      images: getImages("shorts", "shorts8"),
      color: "黑色 | 1943/320/800",
      description: [
        "模特兒身高：187 cm | 尺碼：L",
        "運動短褲；輕質彈性科技布料製成；內側網眼；為各式運動而設計。",
      ],
      content: "100% 聚酯纖維 83% 聚酯纖維17% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "紋理舒適版短褲",
      price: 1190,
      images: getImages("shorts", "shorts9"),
      color: "黑色 | 2634/551/800",
      description: [
        "Regular fit 標準版短褲；採用彈性布料製成；鬆緊帶腰身配可調式抽繩；正面打褶。 前口袋；嵌線後口袋；翻摺褲腳。",
      ],
      content: "材質和保養: 71% 聚酯纖維, 25% 嫘縈, 4% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "拼接紋理百慕達短褲",
      price: 1290,
      images: getImages("shorts", "shorts10"),
      color: "黑色 | 0761/451/800",
      description: [
        "Relaxed fit 休閒版短褲；採用彈性棉質製成；鬆緊帶腰身配可調式抽繩；側口袋；後貼袋。",
      ],
      content: "材質和保養: 73% 棉, 27% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "加大碼亞麻-人造絲百慕達短褲",
      price: 1490,
      images: getImages("shorts", "shorts11"),
      color: "黑色 | 1195/422/800",
      description: [
        "寬鬆版短褲；採用亞麻和人造絲混紡製成。 前口袋；嵌線後口袋；側襬開衩；拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 52% 亞麻, 48% 嫘縈",
    },
    {
      id: uuidv4(),
      name: "幾何印花 JACQUARD 提花短褲",
      price: 1490,
      images: getImages("shorts", "shorts12"),
      color: "黑色 | 1618/376/800",
      description: [
        "模特兒身高：188 cm | 尺碼：L",
        "Relaxed fit 休閒版短褲；採用人造絲和棉質混紡製成；可調式鬆緊帶腰身配抽繩；側口袋；嵌線後口袋。",
      ],
      content: "材質和保養: 55% 嫘縈, 45% 棉",
    },
  ],
  Jeans: [
    {
      id: uuidv4(),
      name: "刺繡 BAGGY FIT 牛仔褲",
      price: 1990,
      images: getImages("jeans", "jeans1"),
      color: "黑色 | 1538/401/800",
      description: [
        "吊襠牛仔褲。 五口袋。 背面撞色刺繡。 褪色效果。 拉鍊和頂部鈕扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "拼接真皮工裝風牛仔褲",
      price: 1990,
      images: getImages("jeans", "jeans2"),
      color: "黑色 | 4720/437/800",
      description: [
        "休閒版長褲；採用棉質牛仔布和真皮製成。 前口袋和後貼袋。 腿部翻蓋貼袋。 拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質 主要面料 100% 棉 配飾 100% 牛皮 襯裡 100% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "口袋裝飾工裝牛仔褲",
      price: 2490,
      images: getImages("jeans", "jeans3"),
      color: "黑色 | 4720/437/800",
      description: [
        "模特兒身高：187 cm | 尺碼：M",
        "Relaxed fit 休閒版長褲；採用棉質牛仔布製成；前口袋；後貼袋；多功能褲管口袋；褪色效果；門襟配拉鍊和頂部鈕扣。",
      ],
      content: "材質和保養: 99% 棉, 1% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "SLIM FIT TAPERED 錐形版牛仔褲",
      price: 1490,
      images: getImages("jeans", "jeans4"),
      color: "黑色 | 4060/475/800",
      description: [
        "Tapered slim fit 錐形版修身版牛仔褲；五口袋；褪色效果；拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "剪洞效果喇叭牛仔褲",
      price: 1990,
      images: getImages("jeans", "jeans5"),
      color: "黑色 | 0840/363/800",
      description: [
        "模特兒身高：186 cm | 尺碼：M",
        "喇叭牛仔褲。 五口袋。 剪洞褪色效果。 不規則褲腳。 拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "SLIM CROPPED-FIT 九分牛仔褲",
      price: 1290,
      images: getImages("jeans", "jeans6"),
      color: "黑色 | 4551/402/800",
      description: [
        "Slim fit cropped 修身版及踝牛仔褲；五口袋設計；褪色效果；正面紐扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "漸層色褪色 RELAXED FIT 牛仔褲",
      price: 1490,
      images: getImages("jeans", "jeans7"),
      color: "黑色 | 6688/425/800",
      description: [
        "模特兒身高：187 cm | 尺碼：M",
        "休閒版牛仔褲。 五口袋設計。 腿部褪色漸層色效果。 拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "STRAIGHT FIT 直筒版木匠牛仔褲",
      price: 1990,
      images: getImages("jeans", "jeans8"),
      color: "黑色 | 6855/402/800",
      description: [
        "模特兒身高：186 cm | 尺碼：L",
        "Straight fit 直筒版木匠牛仔褲；前口袋和後貼袋；多功能絆帶和腿部口袋；褪色效果；拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "BAGGY FIT 吊襠牛仔褲",
      price: 1990,
      images: getImages("jeans", "jeans9"),
      color: "黑色 | 4048/400/800",
      description: ["吊襠版牛仔褲；五口袋；褪色效果；拉鍊褲襠，配鈕扣閉合。"],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "RELAXED FIT 休閒版脫線毛邊牛仔褲",
      price: 1990,
      images: getImages("jeans", "jeans10"),
      color: "黑色 | 9942/444/800",
      description: [
        "模特兒身高：187 cm | 尺碼：M",
        "Relaxed fit 休閒版牛仔褲；五口袋設計；毛邊裝飾正面縫線設計；拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "WIDE-LEG 寬管細褶牛仔褲",
      price: 1790,
      images: getImages("jeans", "jeans11"),
      color: "黑色 | 9942/444/800",
      description: [
        "Wide-leg 寬管牛仔褲；正面打褶腰身；前口袋和後貼袋；拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "口袋設計牛仔褲",
      price: 1490,
      images: getImages("jeans", "jeans12"),
      color: "黑色 | 9794/310/800",
      description: [
        "Straight fit 直筒版褪色修身版長褲；五口袋設計。 多功能袢帶；褲管配口袋；門襟配拉鍊和頂部鈕扣。",
      ],
      content: "材質和保養: 100% 棉",
    },
  ],
  Suits: [
    {
      id: uuidv4(),
      name: "無翻領西裝外套 - LIMITED EDITION",
      price: 4990,
      images: getImages("suits", "suits1"),
      color: "黑色 | 4198/053/800",
      description: [
        "Relaxed fit 休閒版人造絲混紡西裝外套。 無領；長袖；嵌線胸口袋；蓋式側口袋；內袋裝飾；正面鈕扣。",
      ],
      content:
        "材質 57% 聚酯纖維, 24% 羊毛, 15% 嫘縈, 4% 彈性纖維 襯裡 55% 聚酯纖維, 45% 嫘縈",
    },
    {
      id: uuidv4(),
      name: "SLIM FIT 修身款西裝外套",
      price: 3490,
      images: getImages("suits", "suits2"),
      color: "黑色 | 9722/605/800",
      description: [
        "修身版西裝外套；採用人造絲混紡製成。 標準翻領。 繫扣袖口長袖。 嵌線胸口袋；蓋式側口袋。 內袋裝飾。 後襬開衩；正面排扣閉合。",
      ],
      content:
        "材質 63% 聚酯纖維, 33% 嫘縈, 4% 彈性纖維 襯裡全身 100% 聚酯纖維 袖 95% 聚酯纖維, 5% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "西裝外套 - LIMITED EDITION",
      price: 4490,
      images: getImages("suits", "suits3"),
      color: "黑色 | 1564/464/401",
      description: [
        "標準版西裝外套；採用彈性棉質製成。 標準翻領；繫扣袖口長袖。 蓋式側口袋。 內袋裝飾。 背部下襬開叉。 正面鈕扣。",
      ],
      content: "材質 96% 棉, 4% 彈性纖維 襯裡 100% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "舒適版西裝外套",
      price: 3490,
      images: getImages("suits", "suits4"),
      color: "黑色 | 1564/300/800",
      description: [
        "修身版西裝外套；採用人造絲混紡製成。 標準翻領。 繫扣袖口長袖。 嵌線胸口袋；蓋式側口袋。 內袋裝飾。 後襬開衩；正面排扣閉合。",
      ],
      content: "材質 56% 嫘縈, 37% 聚酯纖維, 7% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "方版西裝外套",
      price: 3490,
      images: getImages("suits", "suits5"),
      color: "黑色 | 4088/091/800",
      description: [
        "模特兒身高：186 cm | 尺碼：L",
        "Boxy fit 方版西裝外套；尖角翻領；繫扣袖口長袖；蓋式側口袋；正面排扣閉合。",
      ],
      content: "材質 82% 聚酯纖維 18% 嫘縈",
    },
  ],
  Casual: [
    {
      id: uuidv4(),
      name: "細褶長褲",
      price: 1790,
      images: getImages("casual", "casual1"),
      color: "黑色 | 0706/104/800",
      description: [
        "模特兒身高：186 cm | 尺碼：L",
        "Relaxed fit 休閒版長褲；採用棉質製成。 正面雙打褶腰身；前口袋；嵌線後口袋；門襟配拉鍊和頂部鈕扣。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "繫腰帶打褶長褲",
      price: 1990,
      images: getImages("casual", "casual2"),
      color: "黑色 | 4156/219/800",
      description: [
        "模特兒身高：189 cm | 尺碼：L",
        "直筒長褲。 人造皮腰帶腰身；正面打褶設計。 前口袋和蓋式後口袋。 正面拉鍊和紐扣閉合。",
      ],
      content: "材質和保養: 65% 聚酯纖維 35% 嫘縈",
    },
    {
      id: uuidv4(),
      name: "休閒版打褶長褲",
      price: 1990,
      images: getImages("casual", "casual3"),
      color: "黑色 | 0706/455/800",
      description: [
        "休閒版長褲；腰身正面細褶細節；前口袋；嵌線後口袋；褲襠拉鍊和鈕扣閉合。",
      ],
      content: "材質和保養: 75% 聚酯纖維, 19% 嫘縈, 6% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "細褶設計棉質 - 亞麻長褲",
      price: 1990,
      images: getImages("casual", "casual4"),
      color: "黑色 | 6416/480/800",
      description: [
        "直筒版長褲；採用棉質和亞麻混紡製成。 彈性腰身；正面打褶可調鬆緊；側口袋；後貼袋。",
      ],
      content: "材質和保養: 90% 棉, 10% 亞麻",
    },
    {
      id: uuidv4(),
      name: "舒適版運動風褲腰長褲",
      price: 1490,
      images: getImages("casual", "casual5"),
      color: "黑色 | 7484/303/800",
      description: [
        "棉質混紡長褲；鬆緊帶腰身配可調式抽繩；前口袋；嵌線後口袋。",
      ],
      content: "材質和保養: 71% 棉, 26% 聚酯纖維, 3% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "BALLOON-FIT 細褶長褲",
      price: 1790,
      images: getImages("casual", "casual6"),
      color: "黑色 | 0706/111/800",
      description: [
        "棉質燈籠版長褲。 正面打褶腰身。 前口袋和嵌線後口袋。 拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "REGULAR FIT 舒適長褲",
      price: 1290,
      images: getImages("casual", "casual7"),
      color: "黑色 | 0706/870/800",
      description: [
        "標準版長褲；採用舒適彈性布料製成。 彈性腰身配可調式抽繩；側口袋；嵌線後口袋；翻摺褲腳。",
      ],
      content: "材質和保養: 74% 聚酯纖維, 23% 嫘縈, 3% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "褪色慢跑腰身長褲",
      price: 1290,
      images: getImages("casual", "casual8"),
      color: "黑色 | 6786/350/800",
      description: [
        "模特兒身高：186 cm | 尺碼：L",
        "修身版長褲；採用彈性棉質製成。 彈性腰身配可調式抽繩；前口袋；嵌線後口袋；褪色效果；彈性束口褲腳。",
      ],
      content: "材質和保養: 98% 棉, 2% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "JOGGER 慢跑長褲",
      price: 1490,
      images: getImages("casual", "casual9"),
      color: "黑色 | 0761/313/800",
      description: [
        "標準版長褲；採用棉質布料製成；搭配內襯設計。 彈性腰身配抽繩。 拉鍊側口袋。 撞色徽標鑲飾。 彈性束口褲腳。",
        "Zara Athleticz。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "拉鍊設計科技布料慢跑長褲",
      price: 1490,
      images: getImages("casual", "casual10"),
      color: "黑色 | 8574/361/800",
      description: [
        "模特兒身高：186 cm | 尺碼：L",
        "Relaxed fit 休閒版長褲；採用高彈性科技布料製成；彈性腰身配抽繩；熱封拉鍊前口袋；徽標縫飾；羅紋束口褲腳。",
      ],
      content: "材質和保養: 74% 棉, 20% 聚酯纖維, 6% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "塑身緊身褲",
      price: 1490,
      images: getImages("casual", "casual11"),
      color: "黑色 | 6096/316/800",
      description: [
        "運動緊身褲；採用高彈性布料製成；貼合身體。",
        "- 鬆緊帶腰身配可調式抽繩。-腿部反光效果印花細節。",
      ],
      content: "材質和保養: 73% 聚醯胺纖維, 27% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "腰帶設計科技布料長褲",
      price: 2490,
      images: getImages("casual", "casual12"),
      color: "黑色 | 4695/422/800",
      description: [
        "模特兒身高：186 cm | 尺碼：L",
        "標準版長褲；採用科技布料製成；絨毛內襯。",
      ],
      content: "材質 92% 聚酯纖維 8% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "工裝風長褲",
      price: 1490,
      images: getImages("casual", "casual13"),
      color: "黑色 | 0108/302/800",
      description: [
        "休閒版長褲；彈性腰身配可調式抽繩；前口袋；嵌線後口袋；褲管配蓋式貼袋；褪色效果；彈性束口褲腳。",
      ],
      content: "材質和保養: 98% 棉, 2% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "RELAXED FIT 工裝褲",
      price: 1790,
      images: getImages("casual", "casual14"),
      color: "黑色 | 0108/304/800",
      description: [
        "Relaxed fit 休閒版長褲；前口袋；嵌線後口袋；腿部翻蓋貼袋；褪色效果；正面拉鍊和紐扣閉合。",
      ],
      content: "材質和保養: 98% 棉, 2% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "褪色木匠風長褲",
      price: 1790,
      images: getImages("casual", "casual15"),
      color: "黑色 | 4470/402/800",
      description: [
        "Relaxed fit 休閒版褪色長褲；採用棉質帆布製成；前口袋；後貼袋；門襟配拉鍊和頂部鈕扣。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "RELAXED FIT 休閒版打褶長褲",
      price: 1990,
      images: getImages("casual", "casual16"),
      color: "黑色 | 6861/554/800",
      description: [
        "模特兒身高：191 cm | 尺碼：L",
        "休閒版長褲。 正面打褶腰身。 前口袋；嵌線後口袋。 拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 75% 聚酯纖維, 19% 嫘縈, 6% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "運動風彈性腰身長褲",
      price: 1490,
      images: getImages("casual", "casual17"),
      color: "黑色 | 1195/414/800",
      description: [
        "模特兒身高：188 cm | 尺碼：L",
        "休閒版長褲；可調式鬆緊帶腰身，內側配抽繩；前口袋；後貼袋。",
      ],
      content: "材質和保養: 98% 聚酯纖維, 2% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "SLIM FIT COMFORT 長褲",
      price: 1490,
      images: getImages("casual", "casual18"),
      color: "黑色 | 6861/441/800",
      description: [
        "長褲；採用彈性織布製成；彈性腰身；前口袋；嵌線後口袋；拉鍊褲襠，頂部配鈕扣閉合。",
      ],
      content: "材質和保養: 54% 棉, 43% 聚酯纖維, 3% 彈性纖維",
    },
  ],
  Shirts: [
    {
      id: uuidv4(),
      name: "RELAXED FIT 休閒版針織襯衫",
      price: 1990,
      images: getImages("shirts", "shirts1"),
      color: "黑色 | 4216/404/800",
      description: [
        "Relaxed fit 休閒版標準領針織襯衫；採用短纖棉質布料製成；羅紋邊飾長袖；正面排扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "寬鬆版口袋實用襯衫",
      price: 1790,
      images: getImages("shirts", "shirts2"),
      color: "黑色 | 8281/181/800",
      description: [
        "休閒版翻領襯衫；採用科技布料製成。 綴按扣袖口長袖；正面飾有多功能蓋式貼袋；正面按扣閉合。",
      ],
      content: "材質和保養: 100% 聚醯胺纖維",
    },
    {
      id: uuidv4(),
      name: "彈性紋理襯衫",
      price: 1790,
      images: getImages("shirts", "shirts3"),
      color: "黑色 | 4047/476/800",
      description: [
        "模特兒身高：188 cm | 尺碼：M",
        "Slim fit 修身版襯衫；採用可減少熨燙後需要的布料製成；敞開式寬角領；繫扣袖口長袖；正面排扣閉合。",
      ],
      content: "材質和保養: 87% 聚醯胺纖維, 13% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "紋理襯衫",
      price: 1290,
      images: getImages("shirts", "shirts4"),
      color: "黑色 | 7545/710/800",
      description: [
        "模特兒身高：186 cm | 尺碼：L",
        "Regular-fit 標準版寬角領襯衫；繫扣袖口長袖；鈕扣正面。",
      ],
      content: "材質和保養: 70% 棉, 30% 聚醯胺纖維",
    },
    {
      id: uuidv4(),
      name: "棉質 - 亞麻襯衫",
      price: 1490,
      images: getImages("shirts", "shirts5"),
      color: "黑色 | 1063/312/800",
      description: [
        "模特兒身高：188 cm | 尺碼：L",
        "Regular fit 標準版亞麻和棉質襯衫；繫扣標準領；繫扣袖口長袖；胸貼袋；正面排扣閉合。",
      ],
      content: "材質和保養: 53% 亞麻, 47% 棉",
    },
    {
      id: uuidv4(),
      name: "JACQUARD 幾何提花襯衫",
      price: 1490,
      images: getImages("shirts", "shirts6"),
      color: "黑色 | 4333/321/800",
      description: [
        "模特兒身高：188 cm | 尺碼：L",
        "休閒版襯衫；標準領；短袖；開衩下襬；前襟單排鈕扣。",
      ],
      content: "材質和保養: 65% 棉, 35% 聚醯胺纖維",
    },
    {
      id: uuidv4(),
      name: "RELAXED FIT 口袋設計襯衫",
      price: 1990,
      images: getImages("shirts", "shirts7"),
      color: "黑色 | 9621/851/800",
      description: [
        "休閒版襯衫；繫扣標準領；繫扣袖口長袖。 胸貼袋；正面排扣閉合。",
      ],
      content: "材質和保養: 66% 聚酯纖維, 33% 嫘縈, 1% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "萊賽爾 - 棉質襯衫",
      price: 1490,
      images: getImages("shirts", "shirts8"),
      color: "黑色 | 1063/400/800",
      description: [
        "模特兒身高：187 cm | 尺碼：M",
        "Relaxed fit 休閒版襯衫；採用人造絲和棉質混紡製成；古巴領；短袖；一個胸貼袋；正面排扣閉合。",
      ],
      content: "材質和保養: 62% 再生纖維素纖維, 38% 棉",
    },
    {
      id: uuidv4(),
      name: "抽象印花彈性襯衫",
      price: 1490,
      images: getImages("shirts", "shirts9"),
      color: "黑色 | 7545/412/800",
      description: [
        "襯衫；可減少清洗後熨燙需求的布料所製成；古巴領；短袖；下襬開衩；正面鈕扣閉合。",
      ],
      content: "材質和保養: 85% 聚醯胺纖維, 15% 彈性纖維",
    },
    {
      id: uuidv4(),
      name: "OVERSIZE FIT 加大版凸紋設計襯衫",
      price: 1490,
      images: getImages("shirts", "shirts10"),
      color: "黑色 | 7380/702/800",
      description: [
        "Oversize fit 加大版紋理襯衫。 古巴領；短袖；側襬開叉；前襟配單排鈕扣。",
      ],
      content: "材質和保養: 100% 聚酯纖維",
    },
    {
      id: uuidv4(),
      name: "結飾飄逸襯衫",
      price: 1990,
      images: getImages("shirts", "shirts11"),
      color: "黑色 | 1034/500/800",
      description: [
        "Relaxed fit 休閒版人造絲襯衫；圓領；同布料結飾設計；繫扣袖口長袖；側襬開叉；前襟配隱藏式鈕扣。",
      ],
      content: "材質和保養: 100% 嫘縈",
    },
    {
      id: uuidv4(),
      name: "軟質棉質襯衫",
      price: 1790,
      images: getImages("shirts", "shirts12"),
      color: "黑色 | 0975/115/800",
      description: [
        "Relaxed fit 休閒版襯衫；採用柔軟觸感棉質混紡製成；標準領；繫扣袖口長袖；胸貼袋；前襟配單排鈕扣。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "格紋法蘭絨襯衫",
      price: 1490,
      images: getImages("shirts", "shirts13"),
      color: "黑色 | 1063/440/800",
      description: [
        "休閒版襯衫；法蘭絨飾面棉布製成；尖領；繫扣袖口長袖；胸部貼袋；正面鈕扣閉合。",
      ],
      content: "材質和保養: 100% 棉",
    },
    {
      id: uuidv4(),
      name: "格紋襯衫",
      price: 1790,
      images: getImages("shirts", "shirts14"),
      color: "黑色 | 7545/407/800",
      description: [
        "模特兒身高：187 cm | 尺碼：M",
        "Relaxed fit 休閒版標準領襯衫；採用人造絲混紡布料製成；繫扣袖口長袖；前襟配單排鈕扣。",
      ],
      content: "材質和保養: 83% 嫘縈, 17% 亞克力纖維",
    },
  ],
};

// 上傳所有分類資料到 Firestore 的 "products" 集合中
async function uploadAllProducts() {
  try {
    for (const category in productsData) {
      // 每個分類建立一個文件，文件 ID 就是分類名稱，例如 "TShirts"
      const docRef = doc(db, "products", category);
      await setDoc(docRef, { products: productsData[category] });
      console.log(`Category ${category} uploaded successfully.`);
    }
    console.log("All product data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading products:", error);
  }
}

// 執行上傳
uploadAllProducts();
