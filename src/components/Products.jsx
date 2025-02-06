import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Products() {
  const categories = useSelector((state) => state.category.categories);
  const [selectedCategory, setSelectedCategory] = useState("TShirts");

  function handleClick(id) {
    setSelectedCategory(id);
  }

  return (
    <div className="hidden bg-white md:block">
      <div className="p-3 text-white bg-black rounded-t">所有產品</div>
      <ul>
        {categories.map((item) => (
          <li
            key={item.id}
            className={`p-2 border-b cursor-pointer ${
              selectedCategory === item.id
                ? "bg-grey-light"
                : "hover:bg-grey-light"
            }`}
            onClick={() => handleClick(item.id)}
          >
            <Link to={item.link} className="block w-full h-full">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
