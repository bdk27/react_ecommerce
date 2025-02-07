import { useLocation } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const { product, quantity } = location.state || {};

  if (!product || !quantity) {
    return <p>沒有產品資訊</p>;
  }

  return (
    <>
      <div className="p-5">
        <h1 className="text-2xl font-bold">結帳頁面</h1>
        <div className="mt-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-lg">NT$ {product.price}</p>
          <p className="text-lg">數量: {quantity}</p>
          <div className="w-[150px] mx-auto">
            <img src={product.images[0]} alt={product.name} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
