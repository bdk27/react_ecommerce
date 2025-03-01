import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "@/components/Modal.jsx";
import Introduction from "@/components/Introduction.jsx";

function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  // 從 store 取得所有產品資料（假設 store.products 為所有分類的物件）
  const { products } = useSelector((state) => state.product);
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 將所有分類產品攤平成一個陣列
  const allProducts = useMemo(() => {
    return products ? Object.values(products).flat() : [];
  }, [products]);

  // 過濾出符合搜尋條件的產品
  const filteredProducts = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery)
    );
  }, [allProducts, query]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function handleProductClick(product) {
    setSelectedProduct(product);
    setToggleModal(true);
  }
  function handleCloseModal() {
    setToggleModal(false);
    setSelectedProduct(null);
  }

  return (
    <>
      <div>
        <button
          className="px-4 py-2 mb-4 text-white bg-black rounded"
          onClick={() => navigate("/")}
        >
          返回
        </button>
        <h1 className="mb-4 text-2xl font-bold">
          搜尋結果：{query} ({filteredProducts.length} 筆)
        </h1>
        {filteredProducts.length === 0 ? (
          <p>找不到符合的產品</p>
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {paginatedProducts.map((product) => (
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

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === page
                          ? "bg-black text-white"
                          : "bg-white"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        <Introduction />
      </div>

      {toggleModal && selectedProduct && (
        <Modal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default Search;
