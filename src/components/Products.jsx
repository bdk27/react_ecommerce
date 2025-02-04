import { useSelector } from "react-redux";

function Products() {
  const categories = useSelector((state) => state.category.categories);
  return (
    <>
      <div className="p-3 text-white bg-black rounded-t">所有產品</div>
      <ul>
        {categories.map((item) => (
          <li
            key={item.id}
            className="p-2 border-b cursor-pointer hover:bg-grey-light"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Products;
