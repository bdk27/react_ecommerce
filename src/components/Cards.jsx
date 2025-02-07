import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "@/components/Modal.jsx";

function Cards({ category }) {
  const products = useSelector((state) => state.product.products[category]);
  const [toogleModal, setToogleModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!products) {
    return <p>找不到對應的產品</p>;
  }

  function handleProductClick(product) {
    setSelectedProduct(product);
    setToogleModal(true);
  }

  function handleCloseModal() {
    setToogleModal(false);
    setSelectedProduct(null);
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="py-3 text-center bg-white rounded shadow">
              <div className="w-[150px] mx-auto">
                <img src={product.images[0]} alt={product.name} />
              </div>

              <div>
                <h3 className="py-1 text-sm font-bold">{product.name}</h3>
                <p className="text-sm">NT$ {product.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {toogleModal && selectedProduct && (
        <Modal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default Cards;
