import { useLocation } from "react-router-dom";

function Cart() {
  const location = useLocation();
  const { product, quantity } = location.state || {};
  console.log(location);

  if (!product || !quantity) {
    return <p>沒有產品資訊</p>;
  }

  return (
    <>
      <div>
        <h1 className="mb-3 text-2xl font-bold">結帳頁面</h1>
        <hr />
        <div className="flex items-center justify-start">
          <div className="w-[150px]">
            <img src={product.images[0]} alt={product.name} />
          </div>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-lg">NT$ {product.price}</p>
          <p className="text-lg">數量: {quantity}</p>
        </div>
      </div>
    </>
  );
}

export default Cart;
