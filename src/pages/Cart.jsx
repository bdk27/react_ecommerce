import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFaceTired } from "@fortawesome/free-regular-svg-icons";
import { removeItemFromCart } from "@/data/cartSlice.js";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleRemoveItem(id) {
    const confirmed = window.confirm("確定要刪除此商品嗎?");
    confirmed && dispatch(removeItemFromCart(id));
  }

  function handleNavigation(path) {
    navigate(path);
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
                  單件價格: <span className="text-black">NT$ {item.price}</span>
                </p>
                <p className="text-sm md:text-md text-grey-dark">
                  數量: <span className="text-black">{item.quantity}</span>
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
      <div className="mt-5 text-right">
        <button className="px-5 py-2 text-white transition duration-300 ease-in-out transform bg-black border border-black rounded hover:bg-transparent hover:border hover:border-black hover:text-black">
          前往付款
        </button>
      </div>
    </>
  );
}

export default Cart;
