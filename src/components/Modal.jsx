import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { addItemToCart } from "@/data/cartSlice.js";
import useCachedUserData from "@/hooks/useCachedUserData";
import "swiper/css";
import "swiper/css/navigation";
import "@/assets/css/swiperStyle.css";

function Modal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: reviews,
    loading,
    error,
  } = useCachedUserData(
    `https://randomuser.me/api/?results=5&seed=${product.id}`
  );

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
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-grey-dark">
      <div className="relative w-full max-w-3xl p-5 mx-2 bg-white rounded shadow-lg">
        <button
          className="absolute flex items-center justify-center mt-2 mr-2 bg-black rounded-full -right-2 -top-2 md:top-0 md:right-0 w-7 h-7 lg:w-10 lg:h-10 hover:bg-red-500"
          onClick={onClose}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-sm text-white md:text-md lg:text-lg "
          />
        </button>

        <div className="flex items-start justify-between gap-5">
          {/* 左側區塊 */}
          <div className="flex-1">
            <div className="w-full max-w-xs mx-auto">
              <img
                src={selectedImage}
                alt={product.name}
                className="object-contain"
              />
            </div>
            <div className="flex flex-wrap items-center justify-start gap-2 mt-4 md:justify-between">
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

          {/* 右側區塊 */}
          <div className="flex-1">
            <h1 className="mb-2 text-lg font-bold md:text-xl lg:text-2xl">
              {product.name}
            </h1>
            <p className="mb-2 text-lg font-bold md:text-xl lg:text-2xl">
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
              className="w-full p-1 mb-3 bg-white border"
              min="1"
            />

            <div className="hidden md:block">
              <div className="flex items-center justify-center w-full md:w-[350px] overflow-hidden">
                {loading && <p>評論載入中...</p>}
                {error && <p>評論載入錯誤，請重試!</p>}
                {reviews && reviews.results && (
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    autoplay
                  >
                    {reviews.results.map((review, index) => (
                      <SwiperSlide key={index}>
                        <div className="p-2 text-center rounded bg-grey-light">
                          <div className="w-10 h-10 mx-auto overflow-hidden rounded-full">
                            <img
                              src={review.picture.thumbnail}
                              alt={`${review.name.first} ${review.name.last}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold">
                              {review.name.first} {review.name.last}
                            </p>
                            <div>
                              {Array.from({ length: 5 }, (_, i) => (
                                <FontAwesomeIcon
                                  key={i}
                                  icon={faStar}
                                  className="ml-1 text-yellow-400 fa-sm"
                                />
                              ))}
                            </div>
                            <p className="text-sm">
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Mollitia, earum?
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full p-2 mt-3 text-sm text-white transition duration-300 ease-in-out transform bg-black border border-black rounded md:text-base hover:bg-transparent hover:border hover:border-black hover:text-black "
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
