import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Products() {
  const categories = useSelector((state) => state.category.categories);
  return (
    <div className="hidden md:block">
      <div className="p-3 text-white bg-black rounded-t">所有產品</div>
      <ul>
        {categories.map((item) => (
          <li
            key={item.id}
            className="p-2 border-b cursor-pointer hover:bg-grey-light"
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
