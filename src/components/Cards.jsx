import { useEffect } from "react";
import { useSelector } from "react-redux";

function Cards({ category }) {
  const products = useSelector((state) => state.product.products[category]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  if (!products) {
    return <p>找不到對應的產品</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <div className="py-3 text-center bg-white rounded shadow">
            <div className="w-[150px] mx-auto">
              <img src={product.images[0]} alt={product.name} />
            </div>

            <div>
              <h3 className="text-sm font-bold">{product.name}</h3>
              <p className="text-sm">NT$ {product.price}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Cards;
