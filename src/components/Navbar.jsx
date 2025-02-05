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

  return (
    <>
      <div className="flex items-center justify-between w-full px-5 py-3 bg-white shadow lg:gap-5 lg:justify-center">
        <div className="flex items-center justify-center gap-3 lg:hidden">
          <FontAwesomeIcon
            icon={openSubList ? faXmark : faBars}
            className="fa-lg"
            onClick={() => setOpenSubList(!openSubList)}
          />
          <h1 className="text-2xl font-bold font-playfair">AVELA</h1>
        </div>

        <h1 className="hidden text-3xl font-bold font-playfair lg:block">
          AVELA
        </h1>

        <ul className="flex items-center justify-center gap-5">
          <li>
            <FontAwesomeIcon
              icon={faUser}
              className="cursor-pointer text-grey-dark fa-lg hover:text-black"
            />
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="cursor-pointer text-grey-dark fa-lg hover:text-black"
            />
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
