import Card from "@/components/Card.jsx";
import { v4 as uuidv4 } from "uuid";

function CardsLayout() {
  const allImages = import.meta.glob("@/assets/images/t-shirts/**/*.jpg");
  const cardData = [
    {
      id: uuidv4(),
      name: "飄逸針織 T 恤",
      price: 1190,
      images: getImages("tshirts1"),
      description:
        "模特兒身高：192 cm | 尺碼：L\nRegular fit 標準版針織 T 恤；採用短纖人造絲混紡製成；圓領短袖；羅紋邊飾。",
    },
    {
      id: uuidv4(),
      name: "飄逸針織 T 恤",
      price: 1190,
      images: getImages("tshirts2"),
      description:
        "模特兒身高：192 cm | 尺碼：L\nRegular fit 標準版針織 T 恤；採用短纖人造絲混紡製成；圓領短袖；羅紋邊飾。",
    },
    {
      id: uuidv4(),
      name: "飄逸針織 T 恤",
      price: 1190,
      images: getImages("tshirts3"),
      description:
        "模特兒身高：192 cm | 尺碼：L\nRegular fit 標準版針織 T 恤；採用短纖人造絲混紡製成；圓領短袖；羅紋邊飾。",
    },
    {
      id: uuidv4(),
      name: "飄逸針織 T 恤",
      price: 1190,
      images: getImages("tshirts4"),
      description:
        "模特兒身高：192 cm | 尺碼：L\nRegular fit 標準版針織 T 恤；採用短纖人造絲混紡製成；圓領短袖；羅紋邊飾。",
    },
  ];
  function getImages(folderName, count = 5) {
    return Array.from({ length: count }, (_, i) => {
      const path = `@/assets/images/t-shirts/${folderName}/${folderName}-${
        i + 1
      }.jpg`;
      return allImages[path];
    });
  }

  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {cardData.map((card) => (
        <li key={card.id}>
          <Card
            id={card.id}
            name={card.name}
            price={card.price}
            images={card.images}
            description={card.description}
          />
        </li>
      ))}
    </ul>
  );
}

export default CardsLayout;
