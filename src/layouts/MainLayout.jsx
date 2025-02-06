import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar.jsx";
import Products from "@/components/Products.jsx";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        {/* 電腦版 */}
        <div className="items-start justify-between gap-3 mt-10 md:flex">
          <div className="hidden lg:block lg:w-1/4">
            <Products />
          </div>
          <div className="w-full lg:w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
