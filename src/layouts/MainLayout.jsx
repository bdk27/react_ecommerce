import Navbar from "@/components/Navbar.jsx";
import Banner from "@/components/Banner.jsx";
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
            <p className="bg-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              laboriosam autem, dicta voluptatem assumenda excepturi? Commodi
              dolor cum distinctio voluptatem eligendi! Nobis, numquam? Culpa
              vitae deleniti atque. Aliquid, voluptate aut?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
