import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFaceTired } from "@fortawesome/free-regular-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faPaypal,
  faCcJcb,
} from "@fortawesome/free-brands-svg-icons";
import { removeItemFromCart } from "@/data/cartSlice.js";
import PayPalModal from "@/components/PayPalModal";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setisModalOpen] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const brandIcons = [faCcVisa, faCcMastercard, faCcJcb, faPaypal];

  function handleRemoveItem(id) {
    const confirmed = window.confirm("確定要刪除此商品嗎?");
    confirmed && dispatch(removeItemFromCart(id));
  }

  function handleNavigation(path) {
    navigate(path);
  }

  function handleCloseModal() {
    setisModalOpen(false);
  }

  function handleCheckout() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setisModalOpen(true);
    } else {
      navigate("/login");
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 lg:gap-5">
        <FontAwesomeIcon icon={faFaceTired} className="fa-5x text-grey-dark" />
        <h3 className="text-lg font-bold">你的購物車是空的</h3>
        <button
          className="px-5 py-2 text-sm text-white bg-black rounded md:text-md lg:text-lg"
          onClick={() => handleNavigation("/")}
        >
          繼續購物
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="mb-3 text-xl font-bold">購物車({cartItems.length})</h1>
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between mb-3 border"
          >
            <div className="flex items-center justify-start w-full">
              <div className="w-[100px]">
                <img src={item.images[0]} alt={item.name} />
              </div>
              <div className="ml-4">
                <h2 className="pb-2 font-bold text-md lg:text-lg">
                  {item.name}
                </h2>
                <p className="text-sm md:text-md text-grey-dark">
                  單件價格: NT$ {item.price}
                </p>
                <p className="text-sm md:text-md text-grey-dark">
                  數量: {item.quantity}
                </p>
                <p className="text-sm md:text-md text-grey-dark">
                  小計:
                  <span className="text-red-500 text-md lg:text-lg">
                    NT$ {item.price * item.quantity}
                  </span>
                </p>
              </div>
            </div>

            <div className="p-3">
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer fa-lg"
                onClick={() => handleRemoveItem(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex flex-wrap items-center justify-around md:flex-col md:items-start">
          <h2 className="text-lg font-bold md:text-xl lg:text-2xl ">
            總計: <span className="text-red-500">NT$ {totalAmount}</span>
          </h2>
          <div className="flex items-center md:flex-wrap">
            <p className="text-sm text-grey-dark md:text-base">
              我們支持接受以下付款方式:
            </p>
            <ul className="flex items-center justify-center">
              {brandIcons.map((icon, index) => (
                <li key={index} className="ml-3">
                  <FontAwesomeIcon
                    icon={icon}
                    className="fa-xl text-grey-dark"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-5 text-center">
          <button
            className="px-5 py-2 mr-3 text-sm border border-black rounded md:text-base"
            onClick={() => handleNavigation("/")}
          >
            繼續購物
          </button>
          <button
            onClick={handleCheckout}
            className="px-5 py-2 text-sm text-white transition duration-300 ease-in-out transform bg-black border border-black rounded md:text-base hover:bg-transparent hover:border hover:border-black hover:text-black"
          >
            前往付款
          </button>
        </div>
      </div>

      {isModalOpen && (
        <PayPalModal totalAmount={totalAmount} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default Cart;
