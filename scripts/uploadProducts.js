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
      name: "運動短褲",
      price: 1290,
      images: getImages("shorts", "shorts4"),
      color: "黑色 | 1943/400/807",
      description: [
        "運動短褲；採用輕質彈性科技布料製成；防撕裂紋理。",
        "Zara Athleticz。",
      ],
      content: "材質 主要面料 91% 聚酯纖維, 9% 彈性纖維 次要面料 100% 聚酯纖維",
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
      name: "拼接真皮工裝風牛仔褲",
      price: 2490,
      images: getImages("jeans", "jeans4"),
      color: "黑色 | 4720/437/800",
      description: [
        "模特兒身高：187 cm | 尺碼：M",
        "Relaxed fit 休閒版長褲；採用棉質牛仔布製成；前口袋；後貼袋；多功能褲管口袋；褪色效果；門襟配拉鍊和頂部鈕扣。",
      ],
      content: "材質和保養: 99% 棉, 1% 彈性纖維",
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
