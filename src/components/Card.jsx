import { useState, useEffect } from "react";
import mainTshirt from "@/assets/images/t-shirts/tshirts1/tshirts1-1.jpg";

function Card({ id, name, price, images, description }) {
  //   const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(images);
  }, []);

  return (
    <div className="py-3 text-center bg-white rounded shadow">
      <div className="w-[150px] mx-auto">
        <img src={images[0]} alt={name} />
      </div>

      <div>
        <h3 className="text-sm font-bold">{name}</h3>
        <p className="text-sm">NT$ {price}</p>
      </div>
    </div>
  );
}

export default Card;
