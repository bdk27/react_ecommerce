import { useSelector } from "react-redux";

function Products() {
  const categories = useSelector((state) => state.category.categories);
  return (
    <ul>
      {categories.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export default Products;
