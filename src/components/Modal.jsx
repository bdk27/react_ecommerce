import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { addItemToCart } from "@/data/cartSlice.js";

function Modal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleImageClick(image) {
    setSelectedImage(image);
  }
  function handleQuantityChange(e) {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  }
  function handleAddToCart() {
    const isProductInCart = cartItems.some(
      (item) => item.name === product.name
    );
    if (isProductInCart) {
      alert("此商品已經在購物車中");
      return;
    }
    dispatch(addItemToCart({ ...product, quantity }));
    navigate("/cart", { state: { product, quantity } });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl p-5 bg-white rounded shadow-lg">
        <button
          className="absolute flex items-center justify-center mt-2 mr-2 bg-black rounded-full -right-2 -top-2 md:top-0 md:right-0 w-7 h-7 lg:w-10 lg:h-10 hover:bg-red-500"
          onClick={onClose}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-sm text-white md:text-md lg:text-lg"
          />
        </button>

        <div className="flex items-start justify-between gap-5">
          <div className="flex-1">
            <div className="mx-auto">
              <img src={selectedImage} alt={product.name} />
            </div>

            <div className="flex flex-wrap items-center justify-between mt-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  className="object-cover w-12 h-12 rounded cursor-pointer md:w-14 md:h-14 lg:w-16 lg:h-16"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="mb-2 text-lg font-bold md:text-xl lg:text-2xl">
              {product.name}
            </h1>
            <p className="mb-2 text-lg font-bold md:text-xl lg:text-2xl text-grey-dark">
              NT$ {product.price}
            </p>
            <hr />
            <p className="my-4 text-xs md:text-sm text-grey-dark">
              {product.color}
            </p>
            <p className="text-sm md:text-base">
              {product.description.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="my-4 text-xs md:text-sm text-grey-dark">
              {product.content}
            </p>

            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="border w-[50px] md:w-[100px] p-1"
              min="1"
            />
            <button
              onClick={handleAddToCart}
              className="w-full p-2 mt-3 text-sm text-white transition duration-300 ease-in-out transform bg-black border border-black rounded md:text-base hover:bg-transparent hover:border hover:border-black hover:text-black"
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
