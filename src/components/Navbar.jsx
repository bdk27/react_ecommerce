import { Link } from "react-router-dom";

function Navbar() {
  const routerLinks = [
    { name: "Home", link: "/" },
    { name: "TShirts", link: "/category/t-shirts" },
    { name: "Hoodies", link: "/category/hoodies" },
    { name: "Polos", link: "/category/polos" },
    { name: "Jackets", link: "/category/jackets" },
    { name: "Knitwear", link: "/category/knitwear" },
    { name: "Shirts", link: "/category/shirts" },
    { name: "Shorts", link: "/category/shorts" },
    { name: "Jeans", link: "/category/jeans" },
    { name: "Suits", link: "/category/suits" },
    { name: "Casual", link: "/category/casual" },
  ];

  return (
    <>
      <nav>
        {routerLinks.map((item) => (
          <Link to={item.link} key={item.name}>
            {item.name}
          </Link>
        ))}
      </nav>
    </>
  );
}

export default Navbar;
