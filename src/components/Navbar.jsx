import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
  faXmark,
  faToggleOff,
  faToggleOn,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@/context/ThemeContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const categories = useSelector((state) => state.category.categories);
  const cartItems = useSelector((state) => state.cart.items);

  const [openSubList, setOpenSubList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = openSubList ? "hidden" : "auto";
  }, [openSubList]);

  function goToPage(link) {
    navigate(link);
    setOpenSubList(false);
  }
  function handleNavigation(path) {
    navigate(path);
  }
  function handleSearch() {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setOpenSubList(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between w-full px-5 py-3 bg-white rounded shadow-md lg:gap-5">
        {/* 手機版 */}
        <div className="flex items-center justify-center gap-3 lg:hidden">
          <FontAwesomeIcon
            icon={openSubList ? faXmark : faBars}
            className="cursor-pointer fa-lg"
            onClick={() => setOpenSubList(!openSubList)}
          />
          <h1
            className="text-2xl font-bold cursor-pointer font-playfair"
            onClick={() => handleNavigation("/")}
          >
            AVELA
          </h1>
        </div>
        {/* 電腦版 */}
        <h1
          className="hidden text-3xl font-bold cursor-pointer font-playfair lg:block"
          onClick={() => handleNavigation("/")}
        >
          AVELA
        </h1>
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="搜尋名稱"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1 rounded outline-none bg-grey-light w-[400px]"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={handleSearch}
            className="absolute cursor-pointer right-2 top-2"
          />
        </div>
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
          <li className="flex items-center justify-center">
            <FontAwesomeIcon
              icon={theme === "light" ? faToggleOff : faToggleOn}
              onClick={toggleTheme}
              className="cursor-pointer fa-xl text-grey-dark"
            />
            <p className="ml-1 text-sm text-grey-dark">
              {theme === "light" ? "淺色" : "深色"}
            </p>
          </li>
        </ul>
      </div>

      <ul
        className={`
          w-full transition-all duration-500 ease-in-out overflow-hidden
          ${openSubList ? "h-screen" : "h-0"}
        `}
      >
        <div className="relative mt-3">
          <input
            type="text"
            placeholder="搜尋名稱"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-1 border-b outline-none bg-grey-light"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={handleSearch}
            className="absolute cursor-pointer right-2 top-2"
          />
        </div>
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
