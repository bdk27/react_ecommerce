import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/data/productSlice.js";
import Modal from "@/components/Modal.jsx";

function Cards({ category }) {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [toogleModal, setToogleModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  const categoryMapping = {
    TShirts: "T 恤",
    Polos: "POLO衫",
    Jackets: "外套夾克",
    Knitwear: "針織衫|毛衣",
    Shirts: "襯衫",
    Shorts: "短褲",
    Jeans: "牛仔褲",
    Casual: "休閒褲",
    Suits: "西裝外套",
  };
  const displayCategory = categoryMapping[category] || category;

  useEffect(() => {
    console.log("Dispatching fetchProducts...");
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("Store products:", products);

  // 取得指定分類的產品陣列
  const categoryProducts = products && products[category];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categoryProducts || categoryProducts.length === 0) {
    return <p>找不到對應的產品</p>;
  }

  // 依據排序狀態排序產品
  const sortedProducts = sortOrder
    ? [...categoryProducts].sort((a, b) =>
        sortOrder === "desc" ? b.price - a.price : a.price - b.price
      )
    : categoryProducts;

  function handleProductClick(product) {
    setSelectedProduct(product);
    setToogleModal(true);
  }

  function handleCloseModal() {
    setToogleModal(false);
    setSelectedProduct(null);
  }

  function handleSortChange(e) {
    setSortOrder(e.target.value);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="mb-3 text-2xl font-bold">
          {displayCategory} / <span className="font-playfair">{category}</span>
        </h1>
        <select
          className="rounded outline-none cursor-pointer bg-grey-light"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="" disabled>
            請選擇排序方式
          </option>
          <option value="desc">價格由高至低</option>
          <option value="asc">價格由低至高</option>
        </select>
      </div>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <li
            key={product.id}
            className="cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="py-3 text-center bg-white rounded shadow">
              <div className="w-[150px] mx-auto">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                />
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
