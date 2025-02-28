import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import products_image from "@/assets/images/products_image.jpg";
import products_image2 from "@/assets/images/products_image2.jpg";

function Products() {
  const categories = useSelector((state) => state.category.categories);
  const [selectedCategory, setSelectedCategory] = useState("TShirts");
  const location = useLocation();

  useEffect(() => {
    const found = categories.find((item) =>
      location.pathname.includes(item.link)
    );
    if (found) {
      setSelectedCategory(found.id);
    }
  }, [location.pathname, categories]);

  return (
    <>
      <div className="hidden bg-white md:block">
        <div className="p-3 text-white bg-black rounded-t">所有產品</div>
        <ul>
          {categories.map((item) => (
            <li
              key={item.id}
              className={`p-2 border-b cursor-pointer ${
                selectedCategory === item.id
                  ? "bg-grey-light dark:bg-dark-mode-grey-200"
                  : "hover:bg-grey-light dark:hover:bg-dark-mode-grey-200"
              }`}
            >
              <Link to={item.link} className="block w-full h-full">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col mt-3 space-y-3">
        <div>
          <img
            src={products_image}
            alt="products_image"
            className="rounded-lg"
            loading="lazy"
          />
          <p className="text-sm text-grey-dark font-playfair">
            Origins SPRING SUMMER 2025
          </p>
        </div>
        <div>
          <img
            src={products_image2}
            alt="products_image2"
            className="rounded-lg"
            loading="lazy"
          />
          <p className="text-sm text-grey-dark font-playfair">
            SPECIAL COLLECTIONS
          </p>
        </div>
      </div>
    </>
  );
}

export default Products;
