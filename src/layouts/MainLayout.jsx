import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar.jsx";
import Products from "@/components/Products.jsx";

function MainLayout() {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="items-start justify-between gap-5 mt-10 md:flex">
          {!isCheckoutPage && (
            <div className="hidden lg:block lg:w-1/4">
              <Products />
            </div>
          )}
          <div className={`w-full ${!isCheckoutPage ? "lg:w-3/4" : ""}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
