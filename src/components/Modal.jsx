import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Modal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  function handleImageClick(image) {
    setSelectedImage(image);
  }
  function handleQuantityChange(e) {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  }
  function addCart() {
    console.log("addCart");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl p-5 bg-white rounded shadow-lg">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600"
          onClick={onClose}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="p-3 text-white bg-black rounded-full fa-lg hover:bg-red-500"
          />
        </button>

        <div className="flex items-start justify-between gap-5">
          <div className="flex-1">
            <div className="mx-auto">
              <img src={selectedImage} alt={product.name} />
            </div>

            <div className="flex items-center justify-between mt-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  className="object-cover w-16 h-16 rounded cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
            <p className="mb-2 text-2xl font-bold text-grey-dark">
              NT$ {product.price}
            </p>
            <hr />
            <p className="my-4 text-sm text-grey-dark">{product.color}</p>
            <p>
              {product.description.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="my-4 text-sm text-grey-dark">{product.content}</p>

            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="border w-[100px] p-1"
              min="1"
            />
            <button
              onClick={() => addCart()}
              className="w-full p-2 mt-3 text-white bg-black rounded hover:bg-gray-800"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
