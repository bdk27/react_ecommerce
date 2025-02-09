import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [openSubList, setOpenSubList] = useState(false);
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category.categories);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (openSubList) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openSubList]);

  function goToPage(link) {
    navigate(link);
    setOpenSubList(false);
  }
  function handleNavigation(path) {
    navigate(path);
  }

  return (
    <>
      <div className="flex items-center justify-between w-full px-5 py-3 bg-white shadow lg:gap-5 lg:justify-center">
        <div className="flex items-center justify-center gap-3 lg:hidden">
          <FontAwesomeIcon
            icon={openSubList ? faXmark : faBars}
            className="fa-lg"
            onClick={() => setOpenSubList(!openSubList)}
          />
          <h1
            className="text-2xl font-bold cursor-pointer font-playfair"
            onClick={() => handleNavigation("/")}
          >
            AVELA
          </h1>
        </div>

        <h1
          className="hidden text-3xl font-bold cursor-pointer font-playfair lg:block"
          onClick={() => handleNavigation("/")}
        >
          AVELA
        </h1>

        <ul className="flex items-center justify-center gap-5">
          <li className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="cursor-pointer fa-lg text-grey-dark hover:text-black"
              onClick={() => handleNavigation("/login")}
            />
          </li>
          <li className="relative">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="cursor-pointer text-grey-dark fa-lg hover:text-black"
              onClick={() => handleNavigation("/cart")}
            />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </li>
        </ul>
      </div>

      <ul
        className={`
          w-full transition-all duration-500 ease-in-out overflow-hidden
          ${openSubList ? "h-screen" : "h-0"}
        `}
      >
        {categories.map((item) => (
          <li
            key={item.id}
            onClick={() => goToPage(item.link)}
            className="px-5 py-2 border-b hover:bg-grey-light"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Navbar;
