import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar.jsx";
import Products from "@/components/Products.jsx";
import Footer from "@/components/Footer";

function MainLayout() {
  const location = useLocation();
  const isCartPage = ["/cart", "/login"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto">
        <div className="items-start justify-between gap-5 mt-10 md:flex">
          {!isCartPage && (
            <div className="hidden lg:block lg:w-1/4">
              <Products />
            </div>
          )}
          <div className={`w-full ${!isCartPage ? "lg:w-3/4" : ""}`}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
