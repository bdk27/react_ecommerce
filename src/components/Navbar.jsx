import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const data = [
    {
      id: "TShirts",
      name: "T恤",
      link: "t-shirts",
    },
    {
      id: "Polos",
      name: "POLO 衫",
      link: "polos",
    },
    {
      id: "Jackets",
      name: "外套夾克",
      link: "jackets",
    },
    {
      id: "Knitwear",
      name: "針織衫/毛衣",
      link: "knitwear",
    },
    {
      id: "Shirts",
      name: "襯衫",
      link: "shirts",
    },
    {
      id: "Shorts",
      name: "短褲",
      link: "shorts",
    },
    {
      id: "Jeans",
      name: "牛仔褲",
      link: "jeans",
    },
    {
      id: "Casual",
      name: "休閒褲",
      link: "casual",
    },
    {
      id: "Suits",
      name: "西裝套裝",
      link: "suits",
    },
  ];

  function goToPage(link) {
    navigate(`/category/${link}`);
    setOpenSubList(false);
  }

  return (
    <>
      <div className="flex items-center justify-between w-full px-5 py-3 shadow md:gap-5 md:justify-center">
        <div className="flex items-center justify-center gap-3 md:hidden">
          <FontAwesomeIcon
            icon={openSubList ? faXmark : faBars}
            className="fa-lg"
            onClick={() => setOpenSubList(!openSubList)}
          />
          <h1 className="text-2xl font-bold font-playfair">AVELA</h1>
        </div>

        <h1 className="hidden text-3xl font-bold font-playfair md:block">
          AVELA
        </h1>

        <ul className="flex items-center justify-center gap-5">
          <li>
            <FontAwesomeIcon icon={faUser} className="text-grey-dark fa-lg" />
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-grey-dark fa-lg"
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
        {data.map((item) => (
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
