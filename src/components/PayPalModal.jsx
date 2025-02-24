import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { clearCart } from "@/data/cartSlice.js";

function PayPalModal({ totalAmount, onClose }) {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-opacity-50 bg-grey-dark">
      <div className="relative w-full max-w-3xl p-5 bg-white rounded shadow-lg">
        <button
          className="absolute mt-2 mr-2 bg-black rounded-full -right-2 -top-2 md:top-0 md:right-0 w-7 h-7 lg:w-10 lg:h-10 hover:bg-red-500 "
          onClick={onClose}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-sm text-white md:text-md lg:text-lg"
          />
        </button>

        <h2 className="mb-4 text-xl font-bold">付款</h2>
        <div>
          <PayPalButtons
            style={{
              layout: "horizontal",
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "TWD",
                      value: totalAmount.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              // 2) 付款完成後
              const order = await actions.order.capture();
              alert(`交易完成！交易編號：${order.id}`);
              dispatch(clearCart());
              onClose();
            }}
            onCancel={() => {
              // 用戶在中途取消交易
              alert("交易已取消");
              onClose();
            }}
            onError={(err) => {
              // 交易或系統發生錯誤
              console.error("PayPal Checkout Error:", err);
              alert("付款過程中發生錯誤");
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PayPalModal;
