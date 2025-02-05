import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar.jsx";
import Products from "@/components/Products.jsx";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex items-start justify-between mt-10">
          <div className="w-1/4">
            <Products />
          </div>
          <div className="w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
